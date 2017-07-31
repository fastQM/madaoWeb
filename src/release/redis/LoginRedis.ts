import {BaseRedis} from "./BaseRedis"
import {LogUtil} from "../util/LogUtil"

export class LoginRedis extends BaseRedis{
    
    private TAG = "LoginRedis";
    private static LOGIN_SESSION_TIMEOUT = 5*60;
    // private static LOGIN_BLOCK_TIME = 30*60;
    private static LOGIN_RETRY_COUNT = 5;
    
    constructor(){
        super();
    }
    
    initSession = async(sessionId:string):Promise<boolean> => {
        
        let now = new Date();
        let session = {time: now.toDateString + " " + now.toTimeString};
        
        // let result = await this.setCall("hmset", sessionId, session);
        this.multiAdd("hmset", sessionId, session);
        this.multiAdd("expire", sessionId, LoginRedis.LOGIN_SESSION_TIMEOUT);
        try{
            let result = await this.multiExec();
            return true;
        }catch(error){
            LogUtil.error(this.TAG, error.message);
            return false;
        }
    }
    
    checkIP = async (ip:string):Promise<boolean> => {
        try{
            let count = await this.get(ip);
            
            if(count < LoginRedis.LOGIN_RETRY_COUNT){
                this.multiAdd("incr", ip);
                this.multiAdd("expire", ip, LoginRedis.LOGIN_SESSION_TIMEOUT);
                await this.multiExec();
                
            }
            else if(count == null){
                // await this.setAsync(ip, 0);
                this.multiAdd("set", ip, 0);
                this.multiAdd("expire", ip, LoginRedis.LOGIN_SESSION_TIMEOUT);
                await this.multiExec();
                
                return true;
            }
            else{
                return false;
            }
            
        }catch(error){
            LogUtil.error(this.TAG, error.message);
            return false;
        }
    }
    
    
}