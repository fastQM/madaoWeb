import * as http from "http";
import * as https from "https";
import * as url from "url";

import {LogUtil} from "./LogUtil";

var iconv = require("iconv-lite");

export interface INF_HTTP_REQ{
    host:string,
    path:string,
    port:number
}

export class HttpUtil{
    
    public static TAG = "HttpUtil";
    private requests:Array<INF_HTTP_REQ> = new Array<INF_HTTP_REQ>();
    
    constructor(){
    }
    
    public addRequest = (path:string, port?:number|string) => {
        
        if(path == null){
            LogUtil.error(HttpUtil.TAG, "Invalid path");
            return;
        }        
        
        let req = {host: url.parse(path).hostname, path: url.parse(path).path, port: 80};
            
        if(typeof port === 'string'){
            req.port = parseInt(port);
        }else if(typeof port === 'number'){
            req.port = port;
        }
        
        this.requests.push(req);
    }
    
    private _handler = async (request:INF_HTTP_REQ):Promise<any> => {
        
         return new Promise((resolve:any, reject:any) => {
             
            let option = {
                host: request.host,
                path: request.path,
                port: request.port
            };
            
            try{
                let text:Buffer;
                let req = http.request(option, function(res){
                    
                    res.on('data', function(chunk:any){
                        if(text == null){
                            text = new Buffer(chunk);
                        }
                        else{
                            text = Buffer.concat([text, chunk], text.length+chunk.length);
                        }
                    })
                    res.on('end', function(){
                        if(text != null){
                            resolve(iconv.decode(text, "gb2312"));
                        }
                        else{
                            let error:Error;
                            error = {name: HttpUtil.TAG, message: "No response from server!"};
                            reject(error);
                        }
                    })
                })
                
                req.on('error', function(error:Error){
                    LogUtil.error(HttpUtil.TAG, error.message);
                    reject(error);
                })
                    
                req.end();
            }
            catch(error){
                LogUtil.error(HttpUtil.TAG, "connect error");
                reject(error);
            }
        })        
    }
    
    public start = async (threadNum?:number):Promise<Array<any>> => {
        
        try{
            
            if(threadNum == null){
                threadNum = 1;
            }
            
            let result:Array<any> = new Array<any>();
            while(this.requests.length != 0){
                
                if(threadNum > this.requests.length || threadNum <= 0){
                    threadNum = this.requests.length;    
                }
                
                let executions:Array<Promise<any>> = new Array<Promise<any>>();
                
                for(let i=0;i<threadNum;i++){
                    let item = this.requests.pop();
                    if(item != null){
                        let execution = this._handler(item);
                        executions.push(execution);
                    }
                    else{
                        break;
                    }
                }
                
                result = result.concat(await Promise.all(executions));
            }
            
            return result;
            
        }catch(error){
            LogUtil.error(HttpUtil.TAG, error.message);
            return null;
        }
        
    }
    
    public get = async (request:INF_HTTP_REQ):Promise<any> => {
        
        return new Promise((resolve:any, reject:any) => {
             
            let option = {
                host: request.host,
                path: request.path,
                port: request.port,
                method: 'GET' 
            };
            
            try{
                let text:Buffer;
                let req = http.request(option, function(res){
                    
                    res.on('data', function(chunk:any){
                        if(text == null){
                            text = new Buffer(chunk);
                        }
                        else{
                            text = Buffer.concat([text, chunk], text.length+chunk.length);
                        }
                    })
                    res.on('end', function(){
                        if(text != null){
                            resolve(iconv.decode(text, "utf8"));
                        }
                        else{
                            let error:Error;
                            error = {name: HttpUtil.TAG, message: "No response from server!"};
                            reject(error);
                        }
                    })
                })
                
                req.on('error', function(error:Error){
                    LogUtil.error(HttpUtil.TAG, error.message);
                    reject(error);
                })
                    
                req.end();
            }
            catch(error){
                LogUtil.error(HttpUtil.TAG, "connect error");
                reject(error);
            }
        })                
    }
    
    public post = async (request:INF_HTTP_REQ, data:any):Promise<any> => {
        
        return new Promise((resolve:any, reject:any) => {
             
            let option = {
                host: request.host,
                path: request.path,
                port: request.port,
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
                }
            };
            
            try{
                let text:Buffer;
                let req = http.request(option, function(res){
                    
                    res.on('data', function(chunk:any){
                        if(text == null){
                            text = new Buffer(chunk);
                        }
                        else{
                            text = Buffer.concat([text, chunk], text.length+chunk.length);
                        }
                    })
                    res.on('end', function(){
                        if(text != null){
                            resolve(iconv.decode(text, "utf8"));
                        }
                        else{
                            let error:Error;
                            error = {name: HttpUtil.TAG, message: "No response from server!"};
                            reject(error);
                        }
                    })
                })
                
                req.on('error', function(error:Error){
                    LogUtil.error(HttpUtil.TAG, error.message);
                    reject(error);
                })
                    
                req.write(JSON.stringify(data));
                req.end();
            }
            catch(error){
                LogUtil.error(HttpUtil.TAG, "connect error");
                reject(error);
            }
        })        
    }
    
    
}