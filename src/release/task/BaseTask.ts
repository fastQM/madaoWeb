

export abstract class BaseTask{
    
    private TAG = "BaseTask";
    private isRunning = false;
    private err:Error;
    
    public abstract start():void;
    public abstract stop():void;
    
    public getStatus = ():boolean =>{
        return this.isRunning;
    }
    
    public getLastError = ():Error => {
        return this.err;
    }
    
}