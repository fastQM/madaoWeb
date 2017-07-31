import {BaseMongoDB, INF_SCHEMA} from "./BaseMongoDB"
import {LogUtil} from "../util/LogUtil"
import * as common from "../util/Common"

export interface INF_DB_EXAMPLE_CONFIG{
    
}


export class ExampleDB extends BaseMongoDB<INF_DB_EXAMPLE_CONFIG>{
    
    private TAG = "ExampleDB";
    private static DB_NAME = "example";    
    private static SCHEMA_CONFIG:INF_DB_EXAMPLE_CONFIG;
    private static modelConfig:any;
    
    constructor(){
        super();
        
        // config the database
        
        if(ExampleDB.modelConfig == null){
            ExampleDB.modelConfig = this.createModel(ExampleDB.SCHEMA_CONFIG, ExampleDB.DB_NAME); // model can only be init once
        }

        this.model = ExampleDB.modelConfig;        
    }
}