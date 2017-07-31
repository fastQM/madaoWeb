import { HttpUtil } from "./HttpUtil"


export interface RPC_REQUEST{
    jsonrpc:string,
    method:string,
    params:Array<any>,
    id:number
}

export interface RPC_RESPONSE{
    
}



export class ethereumRPC{
    
    private static id = 0;
    
    private static getId = ():number => {
        return ethereumRPC.id++;
    }
    
    // public static web3_clientVersion = async ():Promise<RPC_RESPONSE> => {
        
    //     let jsonrpc:RPC_REQUEST = {
    //         jsonrpc: "2.0",
    //         method: "web3_clientVersion",
    //         params: [],
    //         id: ethereumRPC.getId()
    //     }
        
    //     HttpUtil.
        
    //     return;
    // }
    
    
    
}