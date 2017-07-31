import {BaseRouter, MethodHandler} from "./BaseRouter"
import {TimeUtil} from "../util/TimeUtil"
import {DownloadUtil} from "../util/DownloadUtil"
import {LogUtil} from "../util/LogUtil"
import {DnsRedis} from "../redis/DnsRedis"

export class FunctionRouter extends BaseRouter{
    
    public static PATH_ROOT = "/function";
    private static TAG = "FunctionRouter";
    
    private static dnsRedis = new DnsRedis();
    
    
    constructor(){
        super(FunctionRouter.PATH_ROOT);
        
        this.setGetRouter("/", FunctionRouter.get);
        this.setGetRouter("/dns", FunctionRouter.updateDNS);
        
    }
    
    static get = async (ctx:any, next:any) => {
        
        // if(ctx.request.query["eros"] != null){
        //     await Eros.Load(ctx.request.query["eros"]);
        //     ctx.body = "EROS DONE"; 
        // }
        // else if(ctx.request.query["download"] != null){
            
        //     setImmediate(async () => {
        //         let downloader = new DownloadUtil();
        //         let file = {src:ctx.request.query["download"]};
        //         downloader.addFile(file);
        //         let result = await downloader.start(1);
        //         LogUtil.info(FunctionRouter.TAG, "Result:" + JSON.stringify(result));
        //     });

        //     ctx.body = "Download DONE";
            
        // }else{
        //     ctx.body = "Invalid Request";
        // } 
    }   
    
    
    // DDNS
    static updateDNS = async (ctx:any, next:any) => {
        let cmd = ctx.request.query['cmd'];
        if(cmd == "update"){
            let ipv4 = ctx.request.ip;
            ipv4 = ipv4.substr(ipv4.lastIndexOf(":")+1);
            
            LogUtil.info(FunctionRouter.TAG, "Access from:" + ipv4 + " Name:" + ctx.request.query["domain"]);
            // ctx.body = ctx.request.ip + " from " + ctx.request.query["name"];
            await FunctionRouter.dnsRedis.update(ctx.request.query["domain"], ipv4)
            ctx.body = ipv4;
        }
        else if(cmd == "redirect"){
            let url = "http://127.0.0.1:8080";
            ctx.redirect(url);
        }
        
    }
}