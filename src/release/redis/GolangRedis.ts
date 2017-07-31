import {LogUtil} from "../util/LogUtil"
import {BaseRedis} from "./BaseRedis"

export class GolangRedis extends BaseRedis{
    
    private TAG = "GolangRedis";
    
    private channel = "/golang"
    
    constructor(){
        super();
        this.subscribe(this.channel, null);
    }
    
}