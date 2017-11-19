import {BaseRouter} from "../router/BaseRouter";
import {UserRouter} from "../router/UserRouter";
import {FunctionRouter} from "../router/FunctionRouter";
import {AdminRouter} from "../router/AdminRouter"
import {BlogRouter} from "../router/BlogRouter"
import {DistributerRouter} from "../router/DistributerRouter"
 
export class Routers{
    
    private static routers = new Array<BaseRouter>();
    
    public static getRouters = ():Array<BaseRouter> => {
        Routers.routers.push(new FunctionRouter());
        Routers.routers.push(new UserRouter());
        
        return Routers.routers;   
    }
    
    
    
}