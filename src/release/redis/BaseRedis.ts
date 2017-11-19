import {LogUtil} from "../util/LogUtil"
import {Global} from "../main/global"

var redis = require("redis");

interface INF_PROMISE{
    (key:string, value:any):Promise<any>;
}

export class BaseRedis{
    
    private static TAG = "BaseRedis";
    
    public static host = Global.REDIS_IP;
    public static port = Global.REDIS_PORT;

    protected client:any;
    protected multi:any;
    
    protected subscriber:any;
    protected publisher:any;
    
    private errorCount = 0;
    private isConnected = false;
    
    // static
	public static ACCESS_ERROR_TIMEOUT = 10*60;
	public static ACCESS_ERROR_MAX_COUNT = 5;
	public static ACCESS_KEEPALIVE_DURATION = 10*60;

	// channels
	public static REDIS_CHANNEL_SOCKET = "SocketChannel";
	public static REDIS_CHANNEL_HTTP = "HttpChannel";

	// prefix
	public static REDIS_PREFIX_SESSIONS = "session:";
	public static REDIS_PREFIX_DEVICES = "device:";
	public static REDIS_PREFIX_USERS = "user:";
	public static REDIS_PREFIX_SOCKET_AGENT = "socket:";
	public static REDIS_PREFIX_MQTT_AGENT = "mqtt:";
	public static REDIS_PREFIX_WEBSOCKET_AGENT = "ws:";
    
    constructor(){
        this.client = redis.createClient(BaseRedis.port, BaseRedis.host, null);
        this.multi = this.client.multi();
        
        this.client.on("ready", () => {
            LogUtil.info(BaseRedis.TAG, "redis for " + BaseRedis.TAG + " connected.");
            this.isConnected = true;
        });
        
        this.client.on("error", (error:Error) => {
            LogUtil.error(BaseRedis.TAG, "redis error:" + error.message);
        });
    }
    
    private _asyncSetCall = async (method:string, key:string, value:any):Promise<any> => {
        return new Promise((resolve:any, reject:any) => {
            this.client[method](key, value, (error:Error, result:any) => {
                if(error){
                    reject(error.message);
                    return;
                }               
                resolve(result);
            }) 
        })
    }
    
    private _syncSetCall = (method:string, key:string, value:any) => {
        this.client[method](key, value);
    }
    
    private _asyncGetCall = async (method:string, key:string):Promise<any> => {
        return new Promise((resolve:any, reject:any) => {
            this.client[method](key, (error:Error, result:any) => {
                if(error){
                    reject(error.message);
                    return;
                }               
                resolve(result);
            }) 
        })
    }
    
    close = () => {
        if(this.client){
            this.client.quit();
            this.client = null;
        }
    }
    
    get = async (key:string):Promise<any> => {
        return this._asyncGetCall("get", key);
    }
    
    // hmset = async (key:string, value:any):Promise<any> => {
    //     return this._asyncSetCall("hmset", key, value);
    // }
    
    // hmset = async (key:string, ...keyValues:string[]):Promise<any> => {
    //     return this._asyncSetCall("hmset", key, keyValues)        
    // }
    
    setAsync = (key:string, value:any) => {
        return this._syncSetCall("set", key, value);
    }
    
    multiAdd = (method:string, key:string, value?:any) => {
        this.multi[method](key, value);
    }

    multiAddWithTwoParas = (method:string, key:string, para1:any, para2:any) => {
        this.multi[method](key, para1, para2);
    }
    
    multiExec = async() => {
        return new Promise((resolve:any, reject:any) => {
            this.multi.exec((error:Error, result:any) => {
                if(error){
                    reject(error.message);
                    return;
                }
                
                resolve(result);
            })
        })
    }
    
    subscribe = function(channel:string, callback:any){
        
        if(!this.isConnected){
            LogUtil.error(BaseRedis.TAG, "Please check redis connection");
            return;
        }
        
        if(this.subscriber == null){
            this.subscriber = this.client.duplicate();
        }
        
        this.subscriber.subscribe(channel);
        this.subscriber.on("subscribe", (channel:string, count:string) => {
            LogUtil.info(BaseRedis.TAG, "channel:" + channel + " count:" + count);
        })
        
        this.subscriber.on("message", (channel:string, message:string) => {
            LogUtil.info(BaseRedis.TAG, "channel:" + channel + " message:" + message);
        })
    }
    
    publish = function (channel:string, message:string) {
        
        if(!this.isConnected){
            LogUtil.error(BaseRedis.TAG, "Please check redis connection");
            return;
        }
        
        if(this.publisher == null){
            this.publisher = this.client.duplicate();
        }
        
        this.publisher.publish(channel, message);
    }
    
}