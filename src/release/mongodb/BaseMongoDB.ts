import {LogUtil} from "../util/LogUtil";
import {Global} from "../main/global"

let mongoose = require("mongoose");
        
export interface INF_SCHEMA{
    type: any,
    unique?: boolean,
    required?: boolean,
    default?: any
}

export class BaseMongoDB<T>{

    private static TAG = "BaseMongoDB";
    private static host = Global.MONGO_DB;
    // private static db = mongoose.connection;
    
    protected schema: any;
    protected model: any;

    
    constructor(){   
    }
    
    public static start(){
        mongoose.Promise = global.Promise;
        mongoose.connect(BaseMongoDB.host, {useMongoClient: true});

        var db = mongoose.connection;
        db.on('error', (error:Error) => {
            if(error){
                LogUtil.error("BaseMongoDB", "connection:" + error.message);
            }
        });

        db.once('open', () => {
            LogUtil.info("BaseMongoDB", "Connected to the MongoDB.");
        });
    }
    
    public static stop(){
        
    }
    
    protected createModel = (schema: T, dbname: string):any => {
        try{
            let schemaConfig = new mongoose.Schema(schema);
            let modelConfig = mongoose.model(dbname, schemaConfig);
            
            return modelConfig;
            
        }catch(error){
            LogUtil.error(BaseMongoDB.TAG, error)
            return null;
        }
    }
    
    protected createSubSchema = (config: any):any => {
        try{
            return new mongoose.Schema(config);
        }catch(error){
            LogUtil.error(BaseMongoDB.TAG, error)
            return null;
        }
    }
    
    // protected createModel = (schema: T, dbname: string):any => {
    //     return mongoose.model(dbname, schema);
    // }
    
    protected add = async (record:T):Promise<any> => {
        return new Promise((resolve:any, reject:any) => {
            var item = new this.model(record);
            item.save(function(error:Error){
                if(error){
                    reject(error);
                    return;
                }
                else{
                    resolve();
                    return;
                }
            })
        });
    }

    protected insertMany = async (record:Array<T>):Promise<any> => {
        return new Promise((resolve:any, reject:any) => {
            this.model.insertMany(record, (error:Error, result:any) => {
                if(error){
                    reject(error);
                    return;
                }else{
                    resolve(result);
                }            
            })
        })
    }
    
    protected findOne = async (conditon:any, filter:string):Promise<any> => {
        return new Promise((resolve:any, reject:any) => {
            this.model.findOne(conditon, filter, (error:Error, result:any) => {
                if(error){
                    reject(error);
                    return;
                }else{
                    resolve(result);
                }
            })      
        })
    }
    
    protected find = async (condition:any, limit:number, sort:any, filter:any)　=> {
         return new Promise((resolve:any, reject:any) => {
            this.model.find(condition)
                      .limit(limit)
                      .sort(sort)
                      .select(filter)
                      .exec((error:Error,result:any) => {
                          if(error != null){
                              reject(error);
                              return;
                          }
                          else{
                              resolve(result);
                          }
                      });
        })       
    }
    
    
}