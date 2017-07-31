/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil"
import {LogUtil} from "../util/LogUtil"
import * as BlogDB from "../mongodb/BlogDB"

export class BlogRouter extends BaseRouter{
    
    public static PATH_ROOT = "/blog";
    private static tag = "BlogRouter";
    
    
    constructor(){
        super(BlogRouter.PATH_ROOT);
        this.setGetRouter("/", this.getList);
    }
    
    private getList = async (ctx:any, next:any) => {
        let blogDB = new BlogDB.BlogDB();
        let result = await blogDB.getList(5);
        ctx.body = result;
    }   
}