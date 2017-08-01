let send = require("koa-send");
import * as path from "path";
import {LogUtil} from "../util/LogUtil";

/**
 * IP地址黑名单过滤
 */

export class KoaFilter{
    
    // private root:string;
    private static TAG = "KoaFilter";
    private opts:any;
    
    constructor(){
    }
    
    public getMiddleware = function():any{
        return this.middleware;
    }
    
    
    private middleware = async (ctx:any, next:any) => {
        
        try{
            let test = false;
            if(test){
                LogUtil.debug("", "[FROM]" + ctx.request.ip + " [" + ctx.request.method + "]" 
                + ctx.request.originalUrl + " [DENY]");
                return;
            }
            
            let start = new Date();
            await next();
            let duration = this.getDuration(start);
            LogUtil.debug("", "[FROM]" + ctx.request.ip + "[" + ctx.request.method + "]" 
            + ctx.request.originalUrl + " " + duration + "ms");
            
        }catch (err) {
            ctx.body = { message: err.message };
            ctx.status = err.status || 500;
        }
    }
    
    private getDuration = function(start:Date):number {
        
        let end = new Date();
        let duration = end.getMilliseconds() - start.getMilliseconds();
        
        return duration;
    }   
}