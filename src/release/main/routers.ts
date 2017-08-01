import {BaseRouter} from "../router/BaseRouter";
import {UserRouter} from "../router/UserRouter";
import {AdvancedRouter} from "../router/AdvancedRouter";
import {FunctionRouter} from "../router/FunctionRouter";
import {AdminRouter} from "../router/AdminRouter"
import {BlogRouter} from "../router/BlogRouter"
import {DistributerRouter} from "../router/DistributerRouter"
 
export class Routers{
    
    private static routers = new Array<BaseRouter>();
    
    public static getRouters = ():Array<BaseRouter> => {
        Routers.routers.push(new FunctionRouter());
        
        return Routers.routers;   
    }
    
    
    
}