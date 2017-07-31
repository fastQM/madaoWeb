/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

import {BaseRouter, MethodHandler} from "./BaseRouter";
import {TimeUtil} from "../util/TimeUtil";
import {TlsModule} from "../advanced/TlsModule";
import {VMModule} from "../advanced/VMModule";
import {LoginRedis} from "../redis/LoginRedis";
import * as UsersDB from "../mongodb/UsersDB";

export class AdvancedRouter extends BaseRouter{

    public static PATH_ROOT = "/advanced";
    private static tag = "AnvancedRouter";
    
    private static tls:TlsModule;
    private static vm:VMModule;
    
    constructor(){
        super(AdvancedRouter.PATH_ROOT);
        
        AdvancedRouter.tls = new TlsModule();
        AdvancedRouter.vm = new VMModule();
        
        this.setPostRouter("/vm/start", AdvancedRouter.vm_start);
        this.setPostRouter("/vm/stop", AdvancedRouter.vm_stop);
        this.setGetRouter("/tls", AdvancedRouter.startTLS);
        this.setPostRouter("/tls/stop", AdvancedRouter.tls_stop);
    }
    
    static vm_start = async (ctx:any, next:any) => { 
        await AdvancedRouter.tls.start();
    }  

    static vm_stop = async (ctx:any, next:any) => { 
    }  
    
    static startTLS = async (ctx:any, next:any) => {
        AdvancedRouter.tls.start();
    }
    
    static tls_stop = async (ctx:any, next:any) => {
    }   
}