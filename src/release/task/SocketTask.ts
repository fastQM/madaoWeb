import { BaseTask } from "./BaseTask";
import { Global } from "../main/global";

let socket = require("socket.io")

export class SocketTask extends BaseTask{

    private static io:any;
    // private static clients:an

    public start(){
        
        SocketTask.io = socket(Global.SHARE.http);

        SocketTask.io.on('connection', function(clients:any){
            // console.log('socket ID:' + clients.id);
        });
    }

    public stop(){

    }

    private static broadcastMessage = function(topic:string, ...params:any[]){
        SocketTask.io.emit(topic, params)
    }

    public static broadcastNewChart = (...params:any[]) => {
        SocketTask.broadcastMessage("test", params)
    }

    



}