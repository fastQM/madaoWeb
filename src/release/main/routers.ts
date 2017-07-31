import {BaseRouter} from "../router/BaseRouter";
import {ExampleRouter} from "../router/ExampleRouter";
import {UserRouter} from "../router/UserRouter";
import {AdvancedRouter} from "../router/AdvancedRouter";
import {FunctionRouter} from "../router/FunctionRouter";
import {AdminRouter} from "../router/AdminRouter"
import {BlogRouter} from "../router/BlogRouter"
import {DistributerRouter} from "../router/DistributerRouter"
 
export class Routers{
    
    private static routers = new Array<BaseRouter>();
    
    public static getRouters = ():Array<BaseRouter> => {

        Routers.routers.push(new ExampleRouter());
        // Routers.routers.push(new UserRouter());
        // Routers.routers.push(new AdvancedRouter());
        Routers.routers.push(new FunctionRouter());
        // Routers.routers.push(new AdminRouter());
        // Routers.routers.push(new BlogRouter());
        // Routers.routers.push(new DistributerRouter());
        
        return Routers.routers;   
    }
    
    
    
}