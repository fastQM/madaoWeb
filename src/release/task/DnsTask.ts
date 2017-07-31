/**
 * We need root privilige to use the port 53
 */
let dns = require("native-dns");

import {BaseTask} from "./BaseTask"
import {LogUtil} from "../util/LogUtil"
import {DnsRedis} from "../redis/DnsRedis"

export class DnsTask extends BaseTask{
    
    private static TAG = "DnsTask";
    private static server = dns.createServer();
    private static redis = new DnsRedis();
    
    public start(){
        
        LogUtil.info(DnsTask.TAG, "starting...")
        // let redis = new DnsRedis();
        
        // let server = dns.createServer();

        DnsTask.server.on('request', async(request:any, response:any) => {
            
            LogUtil.info(DnsTask.TAG, request.question[0].name);
            
            let ip = await DnsTask.redis.dns(request.question[0].name);
            
            if(ip != null){
                response.answer.push(dns.A({
                    name: request.question[0].name,
                    address: ip,
                    ttl: 600,
                }));
            }
            response.send();
        });
        
        DnsTask.server.on('error', function (err:any, buff:any, req:any, res:any) {
            console.log("error" + err.stack);
        });
        
        DnsTask.server.serve(5353);     
        
    }
    
    public stop(){
        
    }
    
    
    
    
}
