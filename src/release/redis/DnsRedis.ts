import {LogUtil} from "../util/LogUtil"
import {BaseRedis} from "./BaseRedis"

export class DnsRedis extends BaseRedis{
    
    private TAG = "DnsRedis";
    
    private prefix = "/dns/";
    private TTL = 60*1000;  // 1 min
    
    constructor(){
        super();
    }
    
    // 不用返回值
    public update = async(key:string, value:string) => {
        try{
            key = this.prefix + key;
            await this.setAsync(key, value);
        }
        catch(error){
            LogUtil.error(this.TAG, error.message)
        }
    }
    
    public dns = async (key:string):Promise<string> => {
        
        try{
            let result = await this.get(this.prefix + key);
            return result;
        }
        catch(error){
            LogUtil.error(this.TAG, error.message);
        }
        
        return null;
        
    }
    
    
    
}