
var cheerio = require("cheerio");

import {HttpUtil} from "./HttpUtil"

interface INF_PROXY{
    address:string,
    port:number
}

export class NetworkProxy{
    
    private static TAG = "";
    private static list = new Array<INF_PROXY>();
    
    static getProxyAddress = async () => {
        
        let http = new HttpUtil();
        http.addRequest("http://www.xicidaili.com/nn/");
        let result = await http.start();
        let jquery = cheerio.load(result[0], {decodeEntities: false, normalizeWhitespace: true});
        
        jquery("tr", function(){
            
        })
        
        
    }
    
    
}