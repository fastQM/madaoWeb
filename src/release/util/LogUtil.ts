let moment = require("moment");

export class LogUtil{

    static info(tag:string, info:string):void{
        let time = moment().format("MM-DD HH:mm:ss");
        console.log("[INFO]" + "[" + time + "]" + tag + ":" + info);
    }
    
    static error(tag:string, error:string):void{
        let time = moment().format("MM-DD HH:mm:ss");
        console.log("[ERROR]" + "[" + time + "]" + tag + ":" + error);
    }

    static debug(tag:string, error:string):void{
        let time = moment().format("MM-DD HH:mm:ss");
        console.log("[DEBUG]" + "[" + time + "]" + tag + ":" + error);
    }    
}