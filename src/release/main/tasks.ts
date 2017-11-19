import {LogUtil} from "../util/LogUtil"
import {BaseTask} from "../task/BaseTask"
import {PoloniexTask} from "../task/PoloniexTask"
import {EventTask} from "../task/EventTask"
import { SocketTask } from "../task/SocketTask";
import { Global } from "./global";

export class Tasks{
    
    private static TAG = "TaskEntrance";
    private static taskList = new Array<BaseTask>();
    
    constructor(){        
    }
    
    public static start = ():boolean => {
        
        setTimeout(()=>{
            LogUtil.info(Tasks.TAG, "loading tasks...")
            // Tasks.taskList.push(new DnsTask())
            Tasks.taskList.push(new PoloniexTask())
            Tasks.taskList.push(new EventTask())
            Tasks.taskList.push(new SocketTask())

            Tasks.taskList.forEach(task => {
                task.start();
            });    
                            
        }, 1000*3); // KOA完成后在启动

        
        return true;
    }
    
}