import {LogUtil} from "../util/LogUtil"
import {BaseTask} from "../task/BaseTask"
import {SyncIP} from "../task/SyncIP"
import {DnsTask} from "../task/DnsTask"
import {PoloniexTask} from "../task/PoloniexTask"

export class Tasks{
    
    private static TAG = "TaskEntrance";
    private static taskList = new Array<BaseTask>();
    
    constructor(){        
    }
    
    public static start = ():boolean => {
        
        setTimeout(()=>{
            
            // Tasks.taskList.push(new DnsTask())
            Tasks.taskList.push(new PoloniexTask())
            
            Tasks.taskList.forEach(element => {
                element.start();
            });    
                            
        }, 1000*3); // KOA完成后在启动

        
        return true;
    }
    
}