/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil";
import {LoginRedis} from "../redis/LoginRedis";
import * as UsersDB from "../mongodb/UsersDB";

export class UserRouter extends BaseRouter{
    
    public static PATH_ROOT = "/user";
    private static redis:LoginRedis; 
    private static tag = "UsersRouter";
    
    constructor(){
        super(UserRouter.PATH_ROOT);
        UserRouter.redis = new LoginRedis();
        this.setGetRouter("/register", this.register);
        this.setPostRouter("/login", this.login)
        
    }
    
    private register = async (ctx:any, next:any) => {
        
        let req = ctx.request.body;
        
        let valid = await UserRouter.redis.checkIP(ctx.request.ip);
        
        let usersDB = new UsersDB.UsersDB();
        let user:UsersDB.INF_DB_USERS_CONFIG;
        user = {username: "test", password: "123456", email:"test@123.com"};
        let result = await usersDB.register(user);
        
        ctx.response.body = result;
    }
    
    private login = async (ctx:any, next:any) => {

        let req = ctx.request.body;
        
        let usersDB = new UsersDB.UsersDB();
        let result = await usersDB.login(req.email, req.password);
        if(result.err == null && result.data == true){
            
        }
        else{
            
        }
        
    }
    
       
}