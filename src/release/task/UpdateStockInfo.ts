import {BaseTask} from "./BaseTask"
import {LogUtil} from "../util/LogUtil"

export class UpdateStockInfo extends BaseTask{
    private static TAG = "UpdateStockInfo";
    
    public start():void{
        LogUtil.info(UpdateStockInfo.TAG, "starting...")
    }
    
    public stop():void{
        
    }
    
}