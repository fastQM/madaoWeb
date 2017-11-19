var koa = require('koa');
var koaBody = require('koa-better-body');

import * as os from "os";
import * as domain from "domain";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

import {KoaStatic} from "../koa/KoaStatic";
import {KoaFilter} from "../koa/KoaFilter";

import {LogUtil} from "../util/LogUtil";
import {InternetUtil} from "../util/InternetUtil";

import {Global} from "./global"
import {Routers} from "./routers"
import {Tasks} from "./tasks"

let TAG = "main";

class Entry{

  public static start = () => {
    process.on('uncaughtException', (err:Error) => {
      LogUtil.info(TAG, `Caught exception: ${err}`);
    });

    // 初始化后台服务以及任务
    Tasks.start();

    let app = new koa();
    Global.SHARE.app = app;

    /**
     * Other middleware
     */
    // app.use(cors());
    // app.use(logger());
    app.use((new KoaFilter()).getMiddleware());

    app.use(koaBody({formidable:{uploadDir: __dirname}}));

    // Public directory
    app.use((new KoaStatic(path.join(__dirname, '/../../www/views'), null)).getMiddleware());
    app.use((new KoaStatic(path.join(__dirname, '/../../www'), null)).getMiddleware());

    // Routers
    let routers = Routers.getRouters();
    routers.forEach(element => {
        app.use(element.getRoutes()).use(element.getAllowedMethods())
    });


    // var options = {
    //   key: fs.readFileSync(path.join(__dirname, '/../../resource/koacert/server.key')),
    //   cert: fs.readFileSync(path.join(__dirname, '/../../resource/koacert/btnas_com.crt')),
    //   ca: fs.readFileSync(path.join(__dirname, '/../../resource/koacert/AddTrustExternalCARoot.crt'))
    //   // passphrase: "QnTIhMq13ktKZosYtNRZ7X9kI96QgUHEvyyHJ8hlrigzJLUqYq"
    // };

    // https.createServer(options, app.callback()).listen(8443);
    let httpHandle = http.createServer(app.callback()).listen(8305);
    Global.SHARE.http = httpHandle;

    LogUtil.info(TAG, "Server Started... ");

    var interfaces = os.networkInterfaces();
    for(var item in interfaces){
      var inf = interfaces[item];
      if(inf != null){
        for(var i=0;i<inf.length;i++){
          if(inf[i].family == "IPv4"){
            LogUtil.info(TAG, "IP:" + inf[i].address);
          }
        }
      }
    }
  }
}

Entry.start();