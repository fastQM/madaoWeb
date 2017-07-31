import {BaseRedis} from "./BaseRedis"
import {LogUtil} from "../util/LogUtil"

export class DistributeTask extends BaseRedis{
    
    private TAG = "DistributeTask";
    
    private static LOGIN_SESSION_TIMEOUT = 24*60;
    private static REDIS_PREFIX = "/distribute/"
    
    constructor(){
        super();
    }
    
    createTask = async(taskId:string, taskInfo:any):Promise<boolean> => {
        
        let key = DistributeTask.REDIS_PREFIX + taskId;
        
        // let result = await this.setCall("hmset", sessionId, session);
        this.multiAdd("hmset", key, taskInfo);
        this.multiAdd("expire", key, DistributeTask.LOGIN_SESSION_TIMEOUT);
        try{
            let result = await this.multiExec();
            return true;
        }catch(error){
            LogUtil.error(this.TAG, error.message);
            return false;
        }
    }
    
    getTaskInfo = async (taskId:string):Promise<any> => {
        let key = DistributeTask.REDIS_PREFIX + taskId;
        let result = await this.get(DistributeTask.REDIS_PREFIX + key);
        
        return result; 
    }
    
    
}