import {LogUtil} from "../util/LogUtil"
import {BaseTask} from "./BaseTask"
import {HttpUtil} from "../util/HttpUtil"
import * as Common from "../util/Common"

let schedule = require("node-schedule");
let cheerio = require("cheerio");
let moment = require("moment");

export class CollectTencentNews extends BaseTask{
    
    private static TAG = "CollectTencentNews";
    
    
    public start(){
        CollectTencentNews.routine();
    }
    
    public stop(){
        
    }
    
    public static routine = () => {
        
        // 不能连续读取，否则服务器会block的
        setImmediate(async() => {
            await CollectTencentNews.update();
        });
    }
    
    private static update = async():Promise<any> => {
        // return new Promise((resolve:any, reject:any) => {
            LogUtil.info(CollectTencentNews.TAG, "start...");
            let rootPath = "http://finance.qq.com";
            let today = moment().format('YYYYMMDD');
            let links = new Array<string>();
            
            
            let http = new HttpUtil();
            http.addRequest(rootPath);
            let content = await http.start(1);
            let jquery = cheerio.load(content[0], {decodeEntities: false, normalizeWhitespace: true});
            jquery('a').each(function(i:number, item:any){
                let link = jquery(this).attr('href');
                // LogUtil.info(CollectTencentNews.TAG, "link:" + link);
                if(Common.isContains(link, "/a/" + today) == true
                && Common.isContains(link, "http://") == true
                && Common.isContains(link, rootPath) == true){

                    // LogUtil.info(CollectTencentNews.TAG, "title:" + jquery(this).attr('title'));
                    //http.addRequest(link);
                    links.push(link);
                }
            })
            
            links = Common.sortStringArray(links, true);
            links.forEach(link => {
                LogUtil.info(CollectTencentNews.TAG, "link:" + link);
                http.addRequest(link);
            });
            
            
            content = await http.start(3);

            content.forEach(element => {
                jquery = cheerio.load(element, {decodeEntities: false, normalizeWhitespace: true});
                LogUtil.info(CollectTencentNews.TAG, "title " + jquery("title").text());               
            });

            
            
    }
    
    
}