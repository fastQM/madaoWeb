import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB";
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

export interface INF_DB_USERS_VALIDATION_CONFIG{
    valid: INF_SCHEMA | boolean,
    code: INF_SCHEMA | string
}

export interface INF_DB_USERS_DETAIL_CONFIG{
    firstname: INF_SCHEMA | string,
    lastname: INF_SCHEMA | string,
    birthyear: INF_SCHEMA | number,
    birthmonth: INF_SCHEMA | number,
    birthday: INF_SCHEMA | number,
}

export interface INF_DB_USERS_CONFIG{
    username: INF_SCHEMA | string,
    email: INF_SCHEMA | string,
    password: INF_SCHEMA | string,
    phone?: INF_SCHEMA | string,
    validation?: INF_SCHEMA | INF_DB_USERS_VALIDATION_CONFIG;
    admin?: INF_SCHEMA | string,
    detail?: INF_SCHEMA | INF_DB_USERS_DETAIL_CONFIG,
    register?: INF_SCHEMA | Date,
    lastLogin?: INF_SCHEMA | Date,
    host?: INF_SCHEMA | string,  
    port?: INF_SCHEMA | number
}

export class UsersDB extends BaseMongoDB<INF_DB_USERS_CONFIG>{
    
    private TAG = "UsersDB";
    private static DB_NAME = "user";
    
    private static SCHEMA_CONFIG:INF_DB_USERS_CONFIG;
    private static modelConfig:any;
    
    // Default value
    public static ADMIN_ADMIN = "admin";
    public static ADMIN_USER = "user";
    public static ADMIN_MANAGE = "manager"
    
    constructor(){
        
        super();
        
        UsersDB.SCHEMA_CONFIG = {
            username: {type:String, unique:true, required: true},
            email: {type:String, unique:true, required: true},
            password: {type:String, required:true},
            phone: {type:String},
            validation:{
                valid: {type: Boolean, default: false},
                code: {type:String},
            },
            admin: {type: String, default: UsersDB.ADMIN_USER, required: true},
            detail: {
                firstname: {type: String},
                lastname: {type: String},
                birthyear: {type: Number},
                birthmonth: {type: Number},
                birthday: {type: Number},
            },
            register: {type: Date, default: Date.now},
            lastLogin:  {type: Date}
        }
        
        if(UsersDB.modelConfig == null){
            UsersDB.modelConfig = this.createModel(UsersDB.SCHEMA_CONFIG, UsersDB.DB_NAME); // model can only be init once
        }

        this.model = UsersDB.modelConfig;

    }
    
    register = async (user:INF_DB_USERS_CONFIG):Promise<common.PROMISE_RETURN> => {   
        try{
            let result = await this.add(user);
            
            return {err:null, data: true};
            
        }catch(err){
            return {err: err.message};
        }
        
    }
    
    login = async (email:string, password:string):Promise<common.PROMISE_RETURN> => {
        try{
            let condition = {email: email};
            let record = await this.findOne(condition, "password");
            
            // compare the password
            if(password == record.password){
                return {err: null, data: true};
            }
            else{
                return {err: "The password is not correct"};
            }
        }catch(err){
            return {err: err.message};
        }
    }
    
    exist = async (condition:any):Promise<common.PROMISE_RETURN> => {
       try{
            let record = await this.findOne(condition, "");
            // compare the password
            if(record!=null){
                return {err: null, data: true};
            }
            else{
                return {err: null, data:false};
            }
        }catch(err){
            return {err: err.message};
        }
        
    }
    
}