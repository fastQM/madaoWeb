/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import { BlogStructs } from "./common.define"
import {TimeUtil} from "../util/TimeUtil"

export class ExampleRouter extends BaseRouter{
    
    public static PATH_ROOT = "/example";
    private static tag = "ExampleRouter";
    
    
    constructor(){
        super(ExampleRouter.PATH_ROOT);
        this.setGetRouter("/", ExampleRouter.get);
    }
    
    static get = async (ctx:any, next:any) => {
        await TimeUtil.sleep(1000);
        let sample = [new BlogStructs("测试", "生日快乐", "2016.10.29", "又是一个冬季", 5)];
        ctx.body = JSON.stringify(sample);
    }   
}