import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB"
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

export interface INF_DB_TOKEN_CHART_CONFIG{
    name?: INF_SCHEMA | string,
    date: INF_SCHEMA | number,
    high: INF_SCHEMA | number,
    low: INF_SCHEMA | number,
    open: INF_SCHEMA | number,
    close: INF_SCHEMA | number,
    volume: INF_SCHEMA | number,
    quoteVolume: INF_SCHEMA | number,
    weightedAverage: INF_SCHEMA | number,
    hm?: INF_SCHEMA | string,
    exchange?: INF_SCHEMA | string
}


export class TokenDB extends BaseMongoDB<INF_DB_TOKEN_CHART_CONFIG>{
    
    private TAG = "TokenDB";
    private static DB_NAME = "TokenDB";    
    private static SCHEMA_CONFIG:INF_DB_TOKEN_CHART_CONFIG;
    private static modelConfig:any;
    
    constructor(){
        super();
        
        // config the database
        TokenDB.SCHEMA_CONFIG = {
            name: {type: String, required: true},
            date: {type: Number, required: true},
            high: {type: Number, required: true},
            low: {type: Number, required: true},
            open: {type: Number, required: true},
            close: {type: Number, required: true},
            volume: {type: Number, required: true},
            quoteVolume: {type: Number, required: true},
            weightedAverage: {type: Number, required: true},
            hm: {type: String, required: true},
            exchange: {type:String, required: true}
        };
        
        if(TokenDB.modelConfig == null){
            TokenDB.modelConfig = this.createModel(TokenDB.SCHEMA_CONFIG, TokenDB.DB_NAME); // model can only be init once
        }

        this.model = TokenDB.modelConfig;        
    }

    public saveCharts = async (records:Array<INF_DB_TOKEN_CHART_CONFIG>):Promise<common.PROMISE_RETURN>  => {
        try{
            let result = await this.insertMany(records)
            // LogUtil.debug(this.TAG, "result:" + result);
            return {err:null, data: true};
        }catch(err){
            return {err:err.message};
        }
    }

    public findLast = async (tokenPair:string):Promise<common.PROMISE_RETURN>  => {
        try{
            let result = await this.find({name:tokenPair}, 1, {_id: -1}, "date");
            LogUtil.debug(this.TAG, "result:" + result);
            return {err: null, data: result};
        }catch(err){
            return {err: err.message};
        }        
    }
}