import * as EventEmitter from "events"
import {BaseTask} from "./BaseTask"
import {LogUtil} from "../util/LogUtil"

const EVENT_GRPC = "grpc"

export class EventTask extends BaseTask{

    public static TAG = "EventTask"
    private static mEvent = new EventEmitter();

    public start() {

        EventTask.mEvent.on("test", ()=>{
            LogUtil.info(EventTask.TAG, "started")
        })

        EventTask.mEvent.on(EVENT_GRPC, (...params:any[])=>{
            LogUtil.info(EventTask.TAG, JSON.stringify(params))
        })

        EventTask.emit("test");
    }

    public stop() {
        EventTask.mEvent.removeAllListeners();
        EventTask.mEvent = null;
    }

    private static emit(event:string, ...params:any[]){
        EventTask.mEvent.emit(event, params);
    }

    public emitGPRCAnalyze(...params:any[]){
        EventTask.emit(EVENT_GRPC, params);
    }




}