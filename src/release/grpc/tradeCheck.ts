import {LogUtil} from "../util/LogUtil"

let PROTO_PATH = __dirname + '/../../resource/protos/tradeCheck.proto';
let grpc = require("grpc")
let tradeCheck = grpc.load(PROTO_PATH).tradeCheck;

// function main() {
//   let client = new tradeCheck.TradeCheckService('localhost:5000', grpc.credentials.createInsecure());

//   client.getInfo({handler: 1}, function(error:any, response:any) {
//     console.log('Greeting:', response);
//   });
// }

// main();

export class TradeCheckGRPC{

  private client:any
  private TAG = "TradeCheckGRPC"

  constructor(){
    this.client = new tradeCheck.TradeCheckService('localhost:5000', grpc.credentials.createInsecure());
  }

  InvokeCheck(tokenName:string){
    this.client.tradeCheck({name:tokenName}, (error:any, response:any) => {
      if(error!=null){
        LogUtil.error(this.TAG, "Error:" + error)
        return
      }

      LogUtil.info(this.TAG, "done")
    })
  }

}