/**
 * 网络爬虫，纪录抓取过的网站
 */

import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB"
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

enum WEB_CONTENT_TYPE{
    text = 1,
    file
}

export interface INF_DB_CRAWLER_CONFIG{
    url: INF_SCHEMA | string,
    datetime: INF_SCHEMA | Date,
    type: INF_SCHEMA | WEB_CONTENT_TYPE,
    path?: INF_SCHEMA | string
}


export class CrawlerDB extends BaseMongoDB<INF_DB_CRAWLER_CONFIG>{
    
    private TAG = "CrawlerDB";
    private static DB_NAME = "crawler";    
    private static SCHEMA_CONFIG:INF_DB_CRAWLER_CONFIG;
    private static modelConfig:any;
    
    constructor(){
        super();
        
        // config the database
        CrawlerDB.SCHEMA_CONFIG = {
            url: {type: String, unique: true, required: true},
            datetime: {type: Date, required: true},
            type: {type: Number},
            path: {type: String}
        }
        
        if(CrawlerDB.modelConfig == null){
            CrawlerDB.modelConfig = this.createModel(CrawlerDB.SCHEMA_CONFIG, CrawlerDB.DB_NAME); // model can only be init once
        }

        this.model = CrawlerDB.modelConfig;        
    }
    
    add = async (record:INF_DB_CRAWLER_CONFIG):Promise<common.PROMISE_RETURN> => {    
        try{
            let result = await this.add(record);
            return {err: null, data: true};
        }
        catch(error){
            return {err: error.message};            
        }
        
    }
    
}