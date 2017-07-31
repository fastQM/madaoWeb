var mosca = require("mosca")

export class MoscaService{

    public start = function(){

        var ascoltatore = {
            //using ascoltatore 
            type: 'redis',
            redis:require('redis'),
            db: 12, 
            port: 6379, 
            return_buffers: true,
            host: "127.0.0.1"
        };
        
        var settings = {
            port: 8083,
            backend: ascoltatore,
            http: {
                port: 3000,
                bundle: true,
                static: './websocket'
            }
        };
        
        var server = new mosca.Server(settings);
        
        server.on('clientConnected', function(client:any) {
            console.log('client connected', client.id);
        });
        
        // fired when a message is received 
        server.on('published', function(packet:any, client:any) {
            console.log('Published', packet.payload);
        });
        
        server.on('ready', setup);
        
        // fired when the mqtt server is ready 
        function setup() {
            console.log('Mosca server is up and running');
        }
    }

}