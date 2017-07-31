/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil"

export class FriendRouter extends BaseRouter{
    
    public static PATH_ROOT = "/friend";
    private static tag = "FriendRouter";
    
    
    constructor(){
        super(FriendRouter.PATH_ROOT);
        this.setGetRouter("/", FriendRouter.get);
    }
    
    static get = async (ctx:any, next:any) => {
        console.log("hello, world");
        await TimeUtil.sleep(3000);
        console.log("next");
    }   
}