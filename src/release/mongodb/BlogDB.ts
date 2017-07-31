import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB"
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

let moment = require("moment");
let cheerio = require('cheerio');

export interface INF_DB_BLOG_COMMENT_CONFIG{
    name: INF_SCHEMA | string,
    email: INF_SCHEMA | string,
    url: INF_SCHEMA | string,
    date: INF_SCHEMA | Date,
    text: INF_SCHEMA | string,
}

export interface INF_DB_BLOG_CONFIG{
    date: INF_SCHEMA | Date,
    title: INF_SCHEMA | string,
    type: INF_SCHEMA | string,
    content: INF_SCHEMA | string,
    comments?: INF_SCHEMA | Array<INF_DB_BLOG_COMMENT_CONFIG>,
    attribute: INF_SCHEMA | string,
    count?: INF_SCHEMA | number
}


export class BlogDB extends BaseMongoDB<INF_DB_BLOG_CONFIG>{
    
    private TAG = "BlogDB";
    private static DB_NAME = "blog";    
    private static SCHEMA_CONFIG:INF_DB_BLOG_CONFIG;
    private static SCHEMA_COMMENT_CONFIG:INF_DB_BLOG_COMMENT_CONFIG;
    private static modelConfig:any;
    
    constructor(){
        super();
        
        // config the database
        BlogDB.SCHEMA_COMMENT_CONFIG = {
            name: {type: String},
            email: {type: String},
            url: {type: String},
            date: {type:Date, default: Date.now},
            text: {type: String}
        }
        
        BlogDB.SCHEMA_CONFIG = {
            date: {type:Date, default: Date.now},
            title: {type:String, required: true},
            type: {type:String},
            content: {type:String, required: true},
            // comments: [commentSchema],
            attribute: {type: String, default: 'private'},
            count: {type: Number, default: 0}  //  访问次数
        }
        
        if(BlogDB.modelConfig == null){
            let commentSchema = this.createSubSchema(BlogDB.SCHEMA_COMMENT_CONFIG); // model can only be init once
            BlogDB.SCHEMA_CONFIG.comments = [commentSchema];
            BlogDB.modelConfig = this.createModel(BlogDB.SCHEMA_CONFIG, BlogDB.DB_NAME);
        }

        this.model = BlogDB.modelConfig;        
    }
    
    getList = async (limit:number):Promise<common.PROMISE_RETURN> => {
        
        try{
            let result = await this.find({}, limit, {date:1}, "date title type content　count");
            return {err: null, data: result};
        }
        catch(err){
            LogUtil.error(this.TAG, err.message);
            return  {err: err, data: null};
        }
        
        
    }
    
}
