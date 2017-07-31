import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB"
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

export interface INF_DB_CONFIG_CONFIG{
    version: INF_SCHEMA | string,
    name:INF_SCHEMA | string,   // the name of this server
    admin:INF_SCHEMA | string,  // the name of the administrator
    password: INF_SCHEMA | string,  // the password of the administrator
    date: INF_SCHEMA | Date,    // the date of init this server
    smb: INF_SCHEMA | string,
    upload: INF_SCHEMA | string
}


export class ConfigDB extends BaseMongoDB<INF_DB_CONFIG_CONFIG>{
    
    public static config:INF_DB_CONFIG_CONFIG;
    public static init:boolean;
    
    private TAG = "ConfigDB";
    private static DB_NAME = "config";    
    private static SCHEMA_CONFIG:INF_DB_CONFIG_CONFIG;
    private static modelConfig:any;
    
    constructor(){
        super();
        
        // config the database
        ConfigDB.SCHEMA_CONFIG = {
            version: {type:String, unique:true, required: true},
            name: {type:String, unique:true, required: true},
            admin: {type:String, unique:true, required: true},
            password: {type:String, unique:true, required: true},
            date: {type:Date, unique:true, required: true},
            smb: {type:String, unique:true, required: true},
            upload: {type:String, unique:true, required: true}
        }
        
        if(ConfigDB.modelConfig == null){
            ConfigDB.modelConfig = this.createModel(ConfigDB.SCHEMA_CONFIG, ConfigDB.DB_NAME); // model can only be init once
        }

        this.model = ConfigDB.modelConfig;        
    }
    
    checkInit = async():Promise<common.PROMISE_RETURN> => {
        try{
            let record = await this.findOne("", "");
            if(record == null){
                ConfigDB.init = false;
                return {err:null, data:false};
            }
            else{
                ConfigDB.init = true;
                ConfigDB.config = record;
                return {err:null, data:true};
            }
            
        }catch(err){
            return {err:err.message};
        }
    }
    
    testInit = async():Promise<boolean> => {
        try{
            let record:INF_DB_CONFIG_CONFIG;
            record = {
                version: "v0.01",
                name: "nbgui",
                admin: "maisuid",
                password: "123456",
                date: new Date(),
                smb: "/mypool/smb",
                upload: "/mypool/upload"
            }
            
            let result = await this.add(record);
            return true;
            
        }
        catch(err){
            LogUtil.error(this.TAG, err.message);
            return false;
        }
    }
    
}