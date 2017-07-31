import {LogUtil} from "../util/LogUtil"
import {BaseTask} from "../task/BaseTask"
import {UpdateStockInfo} from "../task/UpdateStockInfo"
import {CollectTencentNews} from "../task/CollectTencentNews"
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
            
            // let updateStockInfoTask = new UpdateStockInfo();
            // Tasks.taskList.push(new UpdateStockInfo());
            // Tasks.taskList.push(new CollectTencentNews());
            // Tasks.taskList.push(new SyncIP())
            Tasks.taskList.push(new DnsTask())
            Tasks.taskList.push(new PoloniexTask())
            
            Tasks.taskList.forEach(element => {
                element.start();
            });    
                            
        }, 1000*3); // KOA完成后在启动

        
        return true;
    }
    
}