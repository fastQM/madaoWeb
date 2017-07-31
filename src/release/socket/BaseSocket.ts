let socket = require("socket.io")

export class BaseSocket{

    private static io:any
    // private static clients:any

    public static init = function(httpHandle:any){
        
        BaseSocket.io = socket(httpHandle)

        BaseSocket.io.on('connection', function(clients:any){
            // console.log('socket ID:' + clients.id);
        });
    }

    public static broadcastMessage = function(topic:string, msg:string){
        BaseSocket.io.emit(topic, msg)
    }

    



}