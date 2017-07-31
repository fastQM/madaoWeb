let uuid = require("uuid")

export class Random{
    
    static getRand(length:number):string{
        let random:string;
        random = uuid.v4();
        random = random.replace(new RegExp("-", "gm"), "");
        return random.substring(0, length);
        
    }
    
}