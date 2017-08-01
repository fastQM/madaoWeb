/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil"
import {Random} from "../util/Random"
import {LogUtil} from "../util/LogUtil"
import {Config} from "../main/config"

import * as path from "path"
import * as fs from "fs"

let send = require('koa-send');

let TYPE_NETWORK = "network"
let TYPE_CPU = "cpu"

interface TASK_REQ{
    type:string,
    duration:number, // 平均每条任务花费的时间
}

enum RESULT{
    RESULT_OK = 0,
    RESULT_UNKNOWN_ERROR,
}

interface TASK_RSP{
    result:RESULT,
    taskid?:string
    value?:string[]   
}

interface TASK_DETAIL{
    taskid:string
    path:string
    name:string
    jobs:string[]
    index?:number
}

export class DistributerRouter extends BaseRouter{
    
    public static PATH_ROOT = "/distribute";
    private static tag = "DistributerRouter";
    
    private static task:TASK_DETAIL;
    
    constructor(){
        // set ROOT path
        super(DistributerRouter.PATH_ROOT);
            
        // create a distributed task and upload the task file
        this.setPostRouter("/create", DistributerRouter.create);
        this.setPostRouter("/control/:taskid/:cmd", DistributerRouter.control)
        
        // join a distribute task and download the task file
        this.setGetRouter("/join/:taskid", DistributerRouter.join);
        // report the status of a node and get the work
        this.setPostRouter("/report/:taskid", DistributerRouter.report);
        // get the task info
        this.setGetRouter("/taskinfo/:taskid", DistributerRouter.taskInfo);
        
        
    }
    
    static create = async (ctx:any, next:any) => {
        
        LogUtil.info(DistributerRouter.tag, "files:" + ctx.request.files)
        LogUtil.info(DistributerRouter.tag, "fields:" + ctx.request.fields)
        
        let taskid = Random.getRand(16);
        let file = ctx.request.files.uploadfile;
        
        fs.renameSync(file.path, path.join(Config.UPLOAD_FILE_PATH, file.name))
        
        let szStocks = fs.readFileSync(path.join(__dirname, "../../resource/stocklist/00.txt"),"utf-8");
		let cyStocks = fs.readFileSync(path.join(__dirname, "../../resource/stocklist/300.txt"),"utf-8");
		let shStocks = fs.readFileSync(path.join(__dirname, "../../resource/stocklist/600.txt"),"utf-8");
		let stockarrays = szStocks.split('\r\n');
		stockarrays = stockarrays.concat(cyStocks.split('\r\n'));
		stockarrays = stockarrays.concat(shStocks.split('\r\n'));
        
        DistributerRouter.task = {
            taskid: taskid,
            name: file.name,
            path: Config.UPLOAD_FILE_PATH,
            jobs: stockarrays
        }
        
         
        let response:TASK_RSP;
        response = {result:RESULT.RESULT_OK, taskid:taskid};
        ctx.body = JSON.stringify(response);
                   
    }
    
    static control = async (ctx:any, next:any) => {
        console.log("hello, world");
        await TimeUtil.sleep(3000);
        console.log("next");
    }   
    
    static join = async (ctx:any, next:any) => {
        let taskid = ctx.params.taskid;
        console.log("taskid:" + taskid);
        
        let response:TASK_RSP;
        let uploadfile = DistributerRouter.task.name;
        console.log("file:" + uploadfile);
        if(taskid != null && DistributerRouter.task != null){
            let result = await send(ctx, uploadfile, {root: Config.UPLOAD_FILE_PATH})
            return;
        }else{
            
            response = {result:RESULT.RESULT_UNKNOWN_ERROR, taskid:taskid};
            ctx.body = JSON.stringify(response);
        }
    } 
    
    static report = async (ctx:any, next:any) => {
        let taskid = ctx.params.taskid;
        
        let req = ctx.request.fields;
        let response:TASK_RSP;
        console.log("Taskid:" + taskid + " body:" + JSON.stringify(req))
        if(req.status == 1){
            let index = DistributerRouter.task.index;
            response = {result:RESULT.RESULT_OK, value:DistributerRouter.task.jobs.slice(index*100,(index+1)*100)};
            DistributerRouter.task.index++;
            ctx.body = JSON.stringify(response);
        }else{
            response = {result:RESULT.RESULT_OK};
            ctx.body = JSON.stringify(response);
        }
    }
    
    static taskInfo = async (ctx:any, next:any) => {
        console.log("hello, world");
        await TimeUtil.sleep(3000);
        console.log("next");
    }      
}

