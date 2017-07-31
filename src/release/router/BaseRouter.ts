/**
 * 
 * 
 * author: mqiu
 * github: https://github.com/maisuid/nbgui
 */

var RouterMod = require('koa-router');

/**
 * the base class for the router
 */
export interface MethodHandler{
    (ctx:any, next:any): Promise<void>
}

export class BaseRouter{
    
    protected router:any;
    
    constructor(router:string){
        this.router = new RouterMod();
        this.router.prefix(router);  
    }
    
    public setGetRouter(router:String, handler: MethodHandler){     
        this.router.get(router, handler);
    }
    
    public setPostRouter(router:String, handler: MethodHandler){
        this.router.post(router, handler);
    }
    
    public getRoutes(){
        return this.router.routes();
    }
    
    public getAllowedMethods(){
        return this.router.allowedMethods();
    }
    
    
}