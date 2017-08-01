import {LogUtil} from "../util/LogUtil";

const dgram = require('dgram');
const MAX_NODES = 100;
    
interface INF_NODE{
    address:string,
    port:number,
    
}

interface INF_MESSAGE{
    type:string,
    index:number,
    cmd:string,
    datetime:string,
    data:string,
    mac:string
}

export class UdpChannel{
    
    private static TAG = "UdpChannel";
    private list = new Array<INF_NODE>();
    private server = dgram.createSocket('udp4');
    private client = dgram.createSocket('udp4');
    private index = 0;
    
    constructor(){
        
    }
    
    private debugNodes = () => {
        LogUtil.info(UdpChannel.TAG, "Current Nodes:");
        for(let i=0;i<this.list.length;i++){
            LogUtil.info(UdpChannel.TAG, "Index:" + i + "Address:" + this.list[i].address + "Port:" + this.list[i].port);
        }
    }
    
    private addNode = (rinfo:any) => {
        if(rinfo == null || rinfo.address == null || rinfo.port == null){
            return;
        }
        let i:number;
        for(i=0;i<this.list.length;i++){
            if(rinfo.address == this.list[i].address && rinfo.port == this.list[i].port){
                return;
            }
        }
        if(i == this.list.length){  // not found
            let node = {address: rinfo.address, port: rinfo.port};
            this.list.push(node);
        }
    }
    
    private removeNode = (rinfo:any) => {
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].address == rinfo.address && this.list[i].port == rinfo.port){
                this.list.splice(i, 1);
                return;
            }
        }
    }
    
    private getNodes = ():string => {
        return JSON.stringify(this.list);
    }
    
    private createRequestmessage = (cmd:string, data:string):Buffer => {
        
        let now = new Date();
                    
        let message = {
            type: "req",
            index: this.index++,
            cmd: cmd,
            data: data,
            datetime: now.toDateString()
        };
        
        let response = JSON.stringify(message);
        let buffer = new Buffer(response);
        return buffer;
                
    }
    
    private createResponseMessage = (cmd:string, data:string):Buffer => {
        
        let now = new Date();
                    
        let message = {
            type: "rsp",
            index: this.index++,
            cmd: cmd,
            data: data,
            datetime: now.toDateString()
        };
        
        let response = JSON.stringify(message);
        let buffer = new Buffer(response);
        return buffer;
        
        
    }
    
    // private handler = (message:Buffer, rinfo:any):Buffer => {
    //     return null;
    // }
    
    init = () => {
        
        let server = this.server;
        
        server.on('error', (err:Error) => {
            console.log(`server error:\n${err.stack}`);
            server.close();
        });

        server.on('message', (msg:Buffer, rinfo:any) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
            LogUtil.info(UdpChannel.TAG, "Recv messages");
            try{
                let req:INF_MESSAGE;
                req = JSON.parse(msg.toString());
                
                if(req.cmd == "login"){
                    this.addNode(rinfo);
                    this.debugNodes();
                    let response = this.createResponseMessage("login", this.getNodes());
                    server.send(response, 0, response.length, rinfo.port, rinfo.address);
                }
                else if(req.cmd == "nodes"){
                    let response = this.createResponseMessage("nodes", this.getNodes());
                    server.send(response, 0, response.length, rinfo.port, rinfo.address);
                    
                }
                else if(req.cmd == "logout"){
                    this.removeNode(rinfo);
                    this.debugNodes();
                }
                
            }catch(error){
                
            }
            
        });

        server.on('listening', () => {
            var address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });

        server.bind(41234);
    }
    
    testClient = () => {
        
        let client = this.client;
        let request = this.createRequestmessage("login", "");
        
        client.send(request, 0, request.length, 41234, 'localhost');
        
        client.on('error', (err:Error) => {
            
        })
        
        client.on('message', (msg:Buffer, rinfo:any) => {
            console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        })

    }
    
    
}