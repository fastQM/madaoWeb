import {HttpUtil} from "./HttpUtil";
import {LogUtil} from "./LogUtil";

export class InternetUtil{
    
    public static TAG = "InternetUtil";
    public static PATH = "http://ip.taobao.com/service/getIpInfo.php?ip=";
    
    public static getIPInfo = async (ip:string) => {
        // let http = new HttpUtil(InternetUtil.PATH + ip, 80);
        // let result = await http.get();
        // let obj = JSON.parse(result);
        // LogUtil.info(InternetUtil.TAG, obj.data.country);
    }
    
    static getLANIP = () => {
        
    }
    
    static getWLANIP = async () => {
        
        
        
    }
    
}