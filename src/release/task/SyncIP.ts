import {BaseTask} from "./BaseTask"
import {LogUtil} from "../util/LogUtil"
import {HttpUtil} from "../util/HttpUtil"

export class SyncIP extends BaseTask{
    
    private static url = "http://www.tingriver.com/function/dns?cmd=update&domain=www.nbgui.com";
    private static TAG = "SyncIP";
    
    public start(){
        // LogUtil.info(SyncIP.TAG, "starting...")
        // setImmediate(async() => {
        //     await SyncIP.updateIPAddress();
        // });
        
        
        // setInterval(async() => {
        //     await SyncIP.updateIPAddress();
        // }, 1000*60*10);
    }
    
    public stop(){
        
    }
    
    private static updateIPAddress = async():Promise<any> => {
        let httpUtil = new HttpUtil();
        httpUtil.addRequest(SyncIP.url);
        let result = await httpUtil.start(1);
        // return result[0];
        LogUtil.info(SyncIP.TAG, "IP:" + result[0]);
        
    }
    
    
}