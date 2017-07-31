import {LogUtil} from "../util/LogUtil";
import {BaseService} from "../service/BaseService";
import {BaseMongoDB} from "../mongodb/BaseMongoDB";
import {GolangRedis} from "../redis/GolangRedis";
import {UdpChannel} from "../service/UdpChannel";

// import {MqttClient, INF_SUBSCRIBER} from "../util/MqttUtil"
import { MoscaService } from "../service/MoscaService"

export class Services {
    
    private static TAG = "Services";
    private serviceList = new Array<BaseService>();
    
    constructor(){
        
    }
    
    public static start = ():void =>{
        
        // BaseMongoDB.start();
        
        // MqttClient.start();
        // let subscriber = {topic:"news", qos:2, callback: function(message:string){
        //     LogUtil.info(Services.TAG, "recv:" + message);
        // }};
        // MqttClient.subscribe(subscriber);
        // MqttClient.publish("news", "Hello, world", 2);
        
        // let golangRedis = new GolangRedis();
        // golangRedis.publish("/golang", "it is rainy");
        
        // let udpChannel = new UdpChannel();
        // udpChannel.init();
        // udpChannel.testClient();
        // let mosca = new MoscaService();
        // mosca.start();
    }
}
