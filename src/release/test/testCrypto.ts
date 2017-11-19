import {CryptoUtil} from "../util/CryptoUtil"

let crypto = new CryptoUtil();
let key = new Buffer([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78])
        
let result = crypto.AESEncrypt(key, "test");
console.log(result)

let result2 = crypto.AESDescrypt(key, result)
console.log(result2)