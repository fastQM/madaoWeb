/// <reference path="../../../typings/main.d.ts" />
let send = require("koa-send");
import * as path from "path";
import {LogUtil} from "../util/LogUtil";

export class KoaStatic{
    
    // private root:string;
    private static TAG = "KoaStatic";
    private opts:any;
    
    constructor(root:string, opts:any){
        // this.root = root;
        opts = opts || {};
        this.opts = {
            root: root,
            index: opts.index || 'index.html'
        }
    }
    
    getMiddleware = function():any{
        path.resolve(this.opts.root);
        return this.middleware;
    }
    
    
    middleware = async (ctx:any, next:any) => {
        
        try{
            await next();
            
            if (ctx.method != 'HEAD' && ctx.method != 'GET') return;
            // response is already handled
            if (ctx.body != null || ctx.status != 404) return;

            await send(ctx, ctx.path, this.opts);
            
        }catch (err) {
            ctx.body = { message: err.message };
            ctx.status = err.status || 500;
        }
    }   
}