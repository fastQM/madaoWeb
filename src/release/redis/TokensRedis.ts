import {LogUtil} from "../util/LogUtil"
import {BaseRedis} from "./BaseRedis"

var momentUtil = require('moment-timezone');

export class TokensRedis extends BaseRedis{
    
    private TAG = "TokensRedis"

    private static EXPIRE = 24*60*60;
    
    public static PREFIX = "charts"
    public static EXCAHNGE_POLONIEX = "poloniex"

    public static format = "YYYY-MM-DD HH:mm"
    public static tzLondon = "Europe/London"
    public static tzPoloniex = "America/Danmarkshavn"


    constructor(){
        super()
    }

    public saveChartsData = async(exchange:string, tokenName:string, charts:Array<any>):Promise<boolean> => {

        let key = TokensRedis.PREFIX + "-" + exchange + "-" + tokenName;
        for(let i=0;i<charts.length;i++){
            charts[i].hm = momentUtil.unix(charts[i].date).tz(TokensRedis.tzPoloniex).format(TokensRedis.format)
            this.multiAdd("rpush", key, JSON.stringify(charts[i]));
        }

        try{
            let result = await this.multiExec();
            return true;
        }catch(error){
            LogUtil.error(this.TAG, error.message);
            return false;
        }
    }


    public getLastData = async(exchange:string, tokenName:string):Promise<any> => {
        
        let key = TokensRedis.PREFIX + "-" + exchange + "-" + tokenName;

        this.multiAddWithTwoParas("lrange", key, -1, -1)

        try{
            let result = await this.multiExec();
            return result;
        }catch(error){
            LogUtil.error(this.TAG, error.message);
            return null;
        }
    }
    
}