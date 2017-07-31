/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil"
import {LoginRedis} from "../redis/LoginRedis"
import * as UsersDB from "../mongodb/UsersDB"


export class AdminRouter extends BaseRouter{
    
    public static PATH_ROOT = "/admin";
    private static tag = "AdminRouter";
    // private static redis:LoginRedis;
    private static userDB = new UsersDB.UsersDB();
    
    constructor(){
        super(AdminRouter.PATH_ROOT);
        this.setGetRouter("/test", this.checkInit);
    }
    
    private authen = async(ctx:any):Promise<boolean> => {
        return true;
    }
    
    //  check if the admin is existed, it is used in the first init of this server
    private checkInit = async (ctx:any, next:any) => {
        
        let result = await AdminRouter.userDB.exist({admin:UsersDB.UsersDB.ADMIN_ADMIN});
        if(result != null && result.data == false){
            
            let user = {username:"maisuid", email:"12345@qq.com", password:"123", admin:"admin"};
            result = await AdminRouter.userDB.register(user);
            console.error(JSON.stringify(result));
            if(result != null && result.data == true){
                ctx.body = "true";
            }
        }
        
        ctx.body = "false";
        

    }
    
    
    
    
    
}