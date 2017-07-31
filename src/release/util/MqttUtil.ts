import {LogUtil} from "./LogUtil"

let mqtt = require("mqtt");

export interface INF_SUBSCRIBER{
    topic: string,
    qos: number,
    callback: any
}

export class MqttClient{
    
    private static TAG = "MqttClient";
    private static client:any;
    private static topicList = new Array<INF_SUBSCRIBER>();
    
    public static start(){
        
        let opts = {
            clientId: "ubuntu_3", 
            username: "public", 
            password: "public2016", 
            clean: false
        };
        
        MqttClient.client = mqtt.connect("tcp://www.tingriver.com", opts);
        
        MqttClient.client.on("connect", function(){
            LogUtil.info(MqttClient.TAG, "MQTT connected");
        })    
        
        MqttClient.client.on("error", function(err:Error){
            LogUtil.error(MqttClient.TAG, "MQTT error:" + err.message);
        }) 
        
        MqttClient.client.on("message", function(topic:string, message:string){
            LogUtil.info(MqttClient.TAG, "Message arrrived!" + topic);
            let handler = MqttClient.findTopic(topic);
            if(handler != null && handler.callback != null){
                handler.callback(message);
            }
        }) 
    } 
   
   public static subscribe = (subscriber:INF_SUBSCRIBER) => {
       
       if(MqttClient.client != null){
           LogUtil.info(MqttClient.TAG, "subscribe");
           MqttClient.addTopic(subscriber);
           MqttClient.client.subscribe(subscriber.topic, {qos:subscriber.qos});
       }
       
   }   
   
   public static publish = (topic:string, message:string, qos:number) => {
       if(MqttClient.client != null){
           LogUtil.info(MqttClient.TAG, "Publish");
           MqttClient.client.publish(topic, message, {qos:qos});
       }
   } 
    
    private static addTopic = (subscriber:INF_SUBSCRIBER):boolean => {
        if(MqttClient.topicList != null && subscriber != null){
            MqttClient.topicList.push(subscriber);
            return true;
        }
        
        return false;
    }
    
    private static findTopic = (topic:string):INF_SUBSCRIBER => {
        var result:INF_SUBSCRIBER;
        if(MqttClient.topicList != null){
            MqttClient.topicList.forEach(element => {
                if(element.topic == topic){
                    // will not return here
                    result = element;
                }
            });
        }
        
        return result;
    }
    
}