interface GlobalValue{
    app:any,
    http:any
}

export class Global{

    static SHARE:GlobalValue = {
        app:null,
        http:null,
    };
    
    static THIS_IP = "52.43.45.42";
    
    static UPLOAD_FILE_PATH = "/tmp/";
    static CONFIG_FILE_PATH = "/";
    static REDIS_IP = "192.168.0.102";
    // static REDIS_IP = "127.0.0.1"
    static REDIS_PORT = 6379;
    
    // static MONGO_DB = "mongodb://192.168.0.102/nbgui";
    static MONGO_DB = "mongodb://localhost/tokens";

    static POLONIEX_APK_KEY = "7VQ61KIM-HY18NXZ4-UXT3D35L-8T188SY5"
    static POLONIEX_SECRET = "d75743a7a95d6981909a17a0f7aad2101b608fc5a9ac7798b181c859efda5620d899ab70aff3f6b7b7b7a23ef7bb5c6cafb8e737e408156fe90715a7de1e1849"
}