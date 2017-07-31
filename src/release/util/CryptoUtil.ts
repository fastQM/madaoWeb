import crypto = require("crypto");
import {LogUtil} from "./LogUtil"

export class CryptoUtil {
    
    private static TAG = "CodeUtil";
    private cipher:any;
    
    private tmp:string;
    // constructor(algorithm:string, key:any, iv?:string){
    //     this.cipher = crypto.createCipheriv(algorithm, key, iv);
    // }
    
    private encrypt = (data:string | Buffer):string => {
            
        let format:string;    
        if(typeof data === 'string'){
            format = 'utf8';
            
        }
        else if(typeof data === 'object'){  // Buffer
            format = 'hex';
        }
        else{
            return null;
        }    
        
        if(this.cipher){
            let encrypted = this.cipher.update(data, format, "hex");
            encrypted += this.cipher.final("hex");
            return encrypted;
        }
        return null;
    }
    
        
    public AESEncrypt = (key:Buffer, plain:string):Buffer => {
        
        this.cipher = crypto.createCipheriv("aes-128-ecb", key, "")
        let result = this.encrypt(new Buffer(plain))
        // console.log(new Buffer(result, "hex"))
        return new Buffer(result, "hex")
    }
    
    public AESDescrypt = (key:Buffer, encrypted:string|Buffer):Buffer => {
        
        // key = new Buffer("12345678abcdefgh")
        // console.log("KEY1:" + key.toString("hex"))
        // console.log("KEY1:" + key.toString("ascii"))
        
        // let test = "31323334";
        // console.log("test1:" + new Buffer(test, "hex"))
        // console.log("test2:" + new Buffer(test, "ascii"))
        
        // return null;
        
        this.cipher = crypto.createDecipheriv("aes-128-ecb", key, "")
        let result = this.encrypt(encrypted)
        let value = new Buffer(result, 'hex')
        return value;
    }
    
    
}
