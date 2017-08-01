/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */
import * as fs from "fs"
import * as path from "path"
import * as os from "os"

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil"

export class MapReduceRouter extends BaseRouter{
    
    public static PATH_ROOT = "/mapreduce";
    private static tag = "MapReduceRouter";
    
    
    constructor(){
        super(MapReduceRouter.PATH_ROOT);
        this.setGetRouter("/create", MapReduceRouter.create);
    }
    
    static create = async (ctx:any, next:any) => {
        if ('POST' != ctx.method){
            await next();
            return
        }

        // multipart upload
        let parts = ctx.parts;
        let part:any;

        // while (part = yield parts) {
        //     let stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
        //     part.pipe(stream);
        //     console.log('uploading %s -> %s', part.filename, stream);
        // }
    }   
}