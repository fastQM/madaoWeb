import * as http from "http";
import * as https from "https";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import * as zlib from "zlib"

import {LogUtil} from "./LogUtil";

let moment = require("moment");

export interface INF_DOWNLOAD_FILE{
    src: string,
    dest?: string,
    continue?: boolean
    compressed?: boolean
}

export class DownloadUtil{
        
        public static TAG = "DownloadUtil";
        private static instance:DownloadUtil;
        
        private files:Array<INF_DOWNLOAD_FILE>;
        private compressed:boolean;
        
        constructor(compressed?:boolean){
            if(typeof compressed === 'boolean'){
                this.compressed = compressed;
            }
            
            this.compressed = false;
            this.files = new Array<INF_DOWNLOAD_FILE>();
            
        }
        
        public static getInstance = () => {
            if(DownloadUtil.instance == null){
                DownloadUtil.instance = new DownloadUtil();
            }
            
            return DownloadUtil.instance;
        }
        
        public addFile = (file:INF_DOWNLOAD_FILE) => {
            let today = moment().format('YYYYMMDD');
            let item = {src:file.src, dest:file.dest};
            let root = "./" + today;
            
            if(item.dest == null){
                item.dest = root + "/" + path.basename(file.src);
            }
            else{
                item.dest = root + "/" + item.dest; // add the top folder which name is the date of today
            }
            
            if(!fs.existsSync(root)){
                fs.mkdirSync(root);
            }
            
            if(file.compressed == true || this.compressed == true){
                item.dest += ".gz";
            }
            
            
            this.files.push(item);          
        }
    
        private _download = async (file:INF_DOWNLOAD_FILE):Promise<any> => {
            
            return new Promise((resolve:any, reject:any) => {
                
                let error = new Error();
                let src = file.src;
                let dest = file.dest;
                let protocol:any;
                let stat = {size:0};
                let host = url.parse(src);
                
                if(src == null){
                    error.message = "The file source is not valid";
                    reject(error);
                    return;
                }

                LogUtil.info(DownloadUtil.TAG, "Start downloading " + src);

                try {
                    let dir = path.dirname(dest);
                    LogUtil.info(DownloadUtil.TAG, "PATH:" + dir)
                    if(!fs.existsSync(dir)){
                        LogUtil.info(DownloadUtil.TAG, "Create DIR:" + dir)
                        fs.mkdirSync(dir);
                    }
                    else{
                        if(fs.existsSync(dest)){
                            LogUtil.info(DownloadUtil.TAG, "File exist!");
                            stat = fs.statSync(dest);
                        }
                    }
                    
                    if(host.protocol == 'http:'){
                        protocol = http;
                    }
                    else{
                        protocol = https;
                    }
                } catch(err) {
                    resolve(err);
                }

                let opts = {
                    hostname:host.hostname,
                    path:host.path,
                    method:"GET",
                    headers:{
                        "Range":"bytes=" + stat.size + "-"
                    }
                }
                
                let fileStream = fs.createWriteStream(dest);
                let request = protocol.get(opts, function(response:any) {

                    LogUtil.info(DownloadUtil.TAG, JSON.stringify(response.headers));
                    let targetLength = response.headers["content-length"];
                    
                    // check if response is success
                    if (response.statusCode != 200 && response.statusCode != 302 && response.statusCode != 206) {
                        error.message = "Response status was:" + response.statusCode;
                        reject(error);
                        return;
                    }
                    
                    // 需要完善断点下载
                    // let contentType = response.headers['content-type'];
                    // LogUtil.info(DownloadUtil.TAG, "ContentType:" + contentType);
                    // LogUtil.info(DownloadUtil.TAG, JSON.stringify(response.headers));
                    // let targetLength = response.headers["content-length"];
                    
                    // if(stat != null){
                    //     if(stat.size >= targetLength){
                    //         error.message = "File is already downloaded!"
                    //         response.end();
                    //         reject(error);
                    //         return;
                    //     }
                    //     else{
                    //         //断点下载
                    //         response.setHeader('Content-Range', 'bytes ' + stat.size + '-' + (targetLength - 1) + '/' + targetLength);
                    //     }
                    // }
                    

                    if(file.compressed == true || this.compressed == true){
                        let gzip = zlib.createGzip();
                        response.pipe(gzip).pipe(fileStream);
                    }
                    else{
                        response.pipe(fileStream);
                    }
                    
                    fileStream.on('finish', function() {
                        LogUtil.info(DownloadUtil.TAG, "Download finished.");
                        fileStream.close();  // close() is async, call cb after close completes.
                        resolve(true);
                    });
                })

                request.on('error', function(err:Error) { // Handle errors
                    LogUtil.error(DownloadUtil.TAG, "Download error:" + err.message);
                    fs.unlinkSync(dest); // Delete the file async. (But we don't check the result)  
                    reject(err);
                });

                // Add timeout.
                // request.setTimeout(10000, function () {
                //     request.abort();
                //     error.message = "Timeout";
                //     reject(error);
                // });
            })
        
        }
        
        /**
         * threadNum: the number of the thread to download the files
         */
        public start = async (threadNum:number) => {
            
            try{
                let result:Array<any> = new Array<any>();
                while(this.files.length != 0){
                    
                    if(threadNum > this.files.length || threadNum <= 0){
                        threadNum = this.files.length;    
                    }
                    
                    let executions:Array<Promise<any>> = new Array<Promise<any>>();
                    
                    for(let i=0;i<threadNum;i++){
                        let item = this.files.pop();
                        if(item != null){
                            let execution = this._download(item);
                            executions.push(execution);
                        }
                        else{
                            break;
                        }
                    }
                    
                    result = result.concat(await Promise.all(executions));
                }
                
                return result;
            }
            catch(error){
                LogUtil.error(DownloadUtil.TAG, error.message);
                return null;
            }
        }
}

