import {LogUtil} from "../util/LogUtil";
import {HttpUtil} from "../util/HttpUtil"
import {BaseTask} from "./BaseTask"
// import {TokensRedis} from "../redis/TokensRedis"
// import {TradeCheckGRPC} from "../grpc/tradeCheck"
import {TokenDB, INF_DB_TOKEN_CHART_CONFIG} from "../mongodb/TokenDB"
import {Global} from "../main/global"
import {EventTask} from "./EventTask"
import { SocketTask } from "./SocketTask";


var momentUtil = require("moment")
var tzUtil = require('moment-timezone');
var poloniex = require("poloniex.js");
var autobahn = require('autobahn');
var wsuri = "wss://api.poloniex.com";


export interface TokenPrice{
        pairs:string
        last:string
        lowestAsk:string
        highestBid:string
        percentChange:string
        baseVolume:string
        quoteVolume:string
        isFrozen:number
        hr24High:string
        hr24Low:string
}

export enum ValueIndex{
        pairs = 0,
        last,
        lowestAsk,
        highestBid,
        percentChange,
        baseVolume,
        quoteVolume,
        isFrozen,
        hr24High,
        hr24Low     
}

export interface ChartValue{
        date:number,
        high:number,
        low:number,
        open:number,
        close:number,
        volume:number,
        quoteVolume:number,
        weightedAverage:number
}

interface TokenIndex{
        tokenA:string,
        tokenB:string,
        flag:boolean    //是否可以运算
}

export enum DurationType{
        DAY_1,
        MIN_30,
        MIN_15
}


export class PoloniexTask extends BaseTask{

        private static mTradeLimitByDollor = 200;      //  暂时限定为100美金
        public static mBTCPriceByDollar = 0;
        public static mETHPriceByDollar = 0;
        private static errorCounter = 0;
        public static mTokenList:Array<TokenIndex> = []
        private static TAG = "PoloniexTask"
        private static EXCHANGE_NAME = "Poloniex"
        private polo:any = null;

        public static mFormat = "YYYY-MM-DD HH:mm"
        public static mtzLondon = "Europe/London"
        public static mtzPoloniex = "America/Danmarkshavn"

        private timer:any
        private isNetwork = false

        public static AddError(){
                PoloniexTask.errorCounter++;
                if(PoloniexTask.errorCounter > 10){
                        LogUtil.error(PoloniexTask.TAG, "错误过多退出")
                        // process.exit();
                        
                }
        }

        public static addToken(tokenA:string, tokenB:string){
                // if(PoloniexTask.mTokenList == null){
                //         PoloniexTask.mTokenList = [];
                // }
                let flag = false;

                // if(PoloniexTask.mTokenList.length == 86){
                //         return;
                // }

                PoloniexTask.mTokenList.forEach(token => {
                        if(token.tokenA == tokenA && token.tokenB == tokenB){
                                // LogUtil.debug("", "重复的数字币" + tokenA + "/" + tokenB)
                                flag = true;
                        }
                });

                if(flag == false){
                        LogUtil.info("增加:", tokenA + "/" + tokenB)
                        let newToken = {
                                tokenA: tokenA,
                                tokenB: tokenB,
                                flag:false
                        }

                        PoloniexTask.mTokenList.push(newToken)
                }
        }

        private initPoloniexConnection(){
                this.polo = new poloniex(Global.POLONIEX_APK_KEY, Global.POLONIEX_SECRET);
                this.isNetwork = false;
        }

        public start(){

                this.initPoloniexConnection();

                // 获取数字货币列表以及最新价格
                this.updateListAndPrice();
                // PoloniexTask.addToken("USDT", "ETH");

                let index = 0;
                // let grpc = new TradeCheckGRPC();
                let counter = 0;
                let grpc = new EventTask();

                // 获取最新历史周期数据
                this.timer = setInterval(async() => {
                        
                        if(this.isNetwork){
                                LogUtil.debug(PoloniexTask.TAG, "network is working")

                                // for some unknown reason, the network will never return so here we make it work again. Not a good idea
                                if(counter < 60){
                                        counter++;
                                }else{
                                        counter = 0;
                                        this.initPoloniexConnection();
                                }
                                return
                        }

                        counter = 0;

                        let list = PoloniexTask.mTokenList;

                        if(list.length > 0 && list[index] != null){

                                let tokenA = list[index].tokenA;
                                let tokenB = list[index].tokenB;
                                                                
                                if(index < list.length-1){
                                        index++;
                                }else{
                                        index = 0;
                                }
                                
                                // let tokensRedis = new TokensRedis();
                                let tokenDB = new TokenDB();
                                let tokenName = tokenA + "-" + tokenB;

                                LogUtil.debug(PoloniexTask.TAG, "Token:" + tokenName)

                                let last = await tokenDB.findLast(tokenName)
                                LogUtil.debug(PoloniexTask.TAG, "Last:" + JSON.stringify(last))

                                let date = null
                                if(last.err == null && last.data.length != 0){
                                        date = last.data[0].date + 900
                                }

                                try{

                                        let now = momentUtil().unix()
                                        // LogUtil.debug(PoloniexTask.TAG, "Now:" + now)
                                        if(now < date){
                                                // LogUtil.debug(PoloniexTask.TAG, "Wait for a while")
                                                return
                                        }
                                        let data = await this.getChartData(tokenA, tokenB, DurationType.MIN_15, date)
                                        LogUtil.debug(PoloniexTask.TAG, "Add Data:" + JSON.stringify(data))

                                        if(data[0].date == 0){
                                                LogUtil.debug(PoloniexTask.TAG, "No new data...")
                                                // tokensRedis.close()
                                                return
                                        }

                                        // await tokensRedis.saveChartsData(TokensRedis.EXCAHNGE_POLONIEX, tokenName, data)
                                        let records:Array<INF_DB_TOKEN_CHART_CONFIG> = [];
                                        for(let i=0;i<data.length;i++){
                                                records[i] = data[i];
                                                records[i].exchange = PoloniexTask.EXCHANGE_NAME;
                                                records[i].name = tokenName;
                                                records[i].hm = tzUtil.unix(data[i].date).tz(PoloniexTask.mtzPoloniex).format(PoloniexTask.mFormat)
                                        }

                                        await tokenDB.saveCharts(records)
                                        // tokensRedis.close()
                                        // grpc.InvokeCheck(tokenName);
                                        grpc.emitGPRCAnalyze("happy world");



                                }catch(error){
                                        // tokensRedis.close()
                                        LogUtil.error(PoloniexTask.TAG, "Exception:" + error)
                                }


                        }else if(list[index] == null){
                                LogUtil.error(PoloniexTask.TAG, "INDEX Error:" + index + " length:" + list.length)
                                if(index < list.length-1){
                                        index++;
                                }else{
                                        index = 0;
                                }
                        }
                }, 1000);
        }
        
        public stop(){
                
        }

        

        public updateListAndPrice(){

                LogUtil.info(PoloniexTask.TAG, "连接Poloniex服务器...")
                let connection = new autobahn.Connection({
                        url: wsuri,
                        realm: "realm1"
                });  

                connection.onopen = function (session:any) {
                        function marketEvent (args:any,kwargs:any) {
                                console.log(args);
                        }
                        function tickerEvent (args:any,kwargs:any) {
                                // LogUtil.info("", "代币名称：" + args[ValueIndex.pairs]
                                // + " 当前价格：" + args[ValueIndex.last]
                                // + " 当前涨幅：" + args[ValueIndex.percentChange]
                                // + " 成交量" + args[ValueIndex.baseVolume]);
                                
                                let name = args[ValueIndex.pairs];

                                if(name == "USDT_BTC"){
                                        PoloniexTask.mBTCPriceByDollar = args[ValueIndex.last]
                                        // LogUtil.info("BTC最新价格:", "" + PoloniexTask.mBTCPriceByDollar)
                                }else if(name == "USDT_ETH"){
                                        PoloniexTask.mETHPriceByDollar = args[ValueIndex.last]
                                        // LogUtil.info("ETH最新价格:", "" + PoloniexTask.mETHPriceByDollar)
                                }


                                let tokenName = name.split("_")
                                // if(tokenName[0] != "BTC"){
                                //         return;
                                // }

                                SocketTask.broadcastNewChart(args);

                                // if(args[ValueIndex.baseVolume] < 200){
                                //         LogUtil.info(name, "交易量太小，不做监控" + args[ValueIndex.baseVolume])
                                //         return;
                                // }

                                // LogUtil.info("Names:", tokeNames[0] + "/" + tokeNames[1])
                                PoloniexTask.addToken(tokenName[0], tokenName[1])                                  
                        }
                        function trollboxEvent (args:any,kwargs:any) {
                                console.log(args);
                        }
                        // session.subscribe('BTC_XMR', marketEvent);
                        session.subscribe('ticker', tickerEvent);
                        // session.subscribe('trollbox', trollboxEvent);
                }
                
                connection.onclose = function () {
                        console.log("Websocket connection closed");
                        // process.exit();
                        PoloniexTask.AddError();
                        connection.open();
                }
                                
                connection.open();
        }

        public getBalance = () => {

                this.polo.myBalances(function(err:any, data:any) {
                        if (err){
                                LogUtil.error("", err)
                                PoloniexTask.AddError()
                                return;
                        }

                        for(let key in data){
                                if(parseFloat(data[key]) != 0){
                                        LogUtil.info("", "代币:" + key + " 余额:" + data[key]);
                                }
                        }
                })
        }

        public getOrderBook = async(currencyA:string, currencyB:string):Promise<any> =>{

                return new Promise((resolve, reject) => {
                        this.polo.returnOrderBook(currencyA, currencyB, function(error:any, data:any){
                                if (error){
                                        LogUtil.error("getOrderBook", error)
                                        PoloniexTask.AddError()
                                        reject(error)
                                        return       
                                }
                                else{
                                        resolve(data)
                                }

                        })
                })
        }

        private sell = async(currencyA:string, currencyB:string, rate:number, amount:number) => {

                return new Promise((resolve, reject) => {
                        this.polo.sell(currencyA, currencyB, rate, amount, function(error:any, data:any){
                                if (error){
                                        PoloniexTask.AddError()
                                        reject(error)     
                                }
                                else{
                                        resolve(data)
                                }     
                        })
                })
        }

        private buy = async(currencyA:string, currencyB:string, rate:number, amount:number) => {

                return new Promise((resolve, reject) => {
                        this.polo.buy(currencyA, currencyB, rate, amount, function(error:any, data:any){
                                if (error){
                                        PoloniexTask.AddError()
                                        reject(error)     
                                }
                                else{
                                        resolve(data)
                                }     
                        })
                })
        }

        public autoBuy = async(currencyA:string, currencyB:string):Promise<boolean> =>{
                try{
                        let orderBook = await this.getOrderBook(currencyA, currencyB);
                        let asks:Array<any> = orderBook.asks;
                        if(asks == null || asks.length == 0){
                                LogUtil.error("buy", "无有效数据")
                                return false;
                        }
                        LogUtil.info("", "orderBook:" + JSON.stringify(asks));

                        let lowestAsk = parseFloat(asks[0]);
                        let estimatedAmount = (PoloniexTask.mTradeLimitByDollor/PoloniexTask.mBTCPriceByDollar)/lowestAsk;
                        LogUtil.info("BUY", "最低卖价：" + lowestAsk + " 预估数量：" + estimatedAmount);

                        let quantity = 0
                        let finalRate:number;

                       for(let i=0;i<asks.length;i++){
                                quantity += asks[i][1];
                                LogUtil.info("", "quantity:" + quantity);
                                if(quantity >= estimatedAmount){
                                        finalRate = parseFloat(asks[i][0]);
                                        break;
                                }
                        };

                        let finalAmout = (PoloniexTask.mTradeLimitByDollor/PoloniexTask.mBTCPriceByDollar)/finalRate
                        finalAmout = parseFloat(finalAmout.toFixed(8))
                        LogUtil.info("BUY", "实际买价：" + finalRate + "实际数量：" + finalAmout);

                        let result = await this.buy(currencyA, currencyB, finalRate, finalAmout)
                        LogUtil.info("autoBuy", JSON.stringify(result))

                        return true

                }catch(error){
                        LogUtil.error("BUY", error)
                }

                return false;
        }

        public autoSell = async(currencyA:string, currencyB:string):Promise<boolean> =>{
                try{
                        let orderBook = await this.getOrderBook(currencyA, currencyB);
                        let bids:Array<any> = orderBook.bids;
                        if(bids == null || bids.length == 0){
                                LogUtil.error("autoSell", "无有效数据")
                                return false;
                        }
                        LogUtil.info("autoSell", "orderBook:" + JSON.stringify(bids));

                        let highBid = parseFloat(bids[0]);
                        let estimatedAmount = (PoloniexTask.mTradeLimitByDollor/PoloniexTask.mBTCPriceByDollar)/highBid;
                        LogUtil.info("autoSell", "最高买价：" + highBid + " 预估数量：" + estimatedAmount);

                        let quantity = 0
                        let finalRate:number;

                       for(let i=0;i<bids.length;i++){
                                quantity += bids[i][1];
                                LogUtil.info("", "quantity:" + quantity);
                                if(quantity >= estimatedAmount){
                                        finalRate = parseFloat(bids[i][0]);
                                        break;
                                }
                        };

                        let finalAmout = (PoloniexTask.mTradeLimitByDollor/PoloniexTask.mBTCPriceByDollar)/finalRate
                        finalAmout = parseFloat(finalAmout.toFixed(8));
                        LogUtil.info("autoSell", "实际卖价：" + finalRate + "实际数量：" + finalAmout);

                        let result = await this.sell(currencyA, currencyB, finalRate, finalAmout)
                        LogUtil.info("autoSell", JSON.stringify(result))
                        return true

                }catch(error){
                        LogUtil.error("autoSell", error)
                }

                return false;
        }


        public getChartData = (tokenA:string, tokenB:string, type:DurationType, start?:any):Promise<Array<ChartValue>> => {

                const duration1Day = 86400
                const duration30Min = 1800
                const duration15Min = 900
                const format = "YYYY-MM-DD HH:mm"
         
                this.isNetwork = true

                let duration:number
                // let start:any
                let end = "9999999999"

                if(type == DurationType.DAY_1){
                        duration = duration1Day
                        if(start == null){
                                start = momentUtil().subtract(1, 'days').format('X');
                        }
                        // end = momentUtil().subtract(1, 'days').format('X');
                }else if(type == DurationType.MIN_30){
                        duration = duration30Min
                        if(start == null){
                                start = momentUtil().subtract(24, 'hours').format('X');
                        }
                }else if(type == DurationType.MIN_15){
                        duration = duration15Min
                        if(start == null){
                                start = momentUtil().subtract(24, 'hours').format('X');
                        }
                }

                LogUtil.info("", "当前币种:" + tokenA + "/" + tokenB)
                // LogUtil.info("", momentUtil().format())
                // LogUtil.info("", momentUtil.unix("1495923600").format())
                return new Promise((resolve, reject) => {
                        // for some unknown reason, it will never return after running for a while
                        this.polo.returnChartData(tokenA, tokenB, duration, start, end, (err:any, data:Array<ChartValue>) => {
                                
                                this.isNetwork = false

                                if (err){
                                        LogUtil.error("", err)
                                        PoloniexTask.AddError()
                                        reject(err)
                                        return
                                }
                                // console.log(data);
                                // data.forEach((value:ChartValue) => {
                                //         LogUtil.info("时间:", momentUtil.unix(value.date).format(format)
                                //         + " 高:" + value.high
                                //         + " 低:" + value.low
                                //         + " 成交量:" + value.volume);
                                        
                                // });

                                resolve(data)
                        })
                })

        }

}


// let index = 0;


// let testList = [
//         ["BTC", "FCT"],
// ]


// /* test case 1 */
// let test = new PoloniexTask();
// setTimeout(async () =>{
//         let data = await test.getChartData("BTC", "BCN", DurationType.MIN_30)
//         let tokenUtil = new TokenUtil();
//         tokenUtil.analyze("BTC/BCN", null, data);
//         if(index < PoloniexTask.mTokenList.length-1){
//                 index++;
//         }else{
//                 index = 0;
//         }
// }, 1000)



// /* test case 2 */
// PoloniexTask.updateListAndPrice();
// let timer = setInterval(async() => {

//         let test = new PoloniexTask();
//         LogUtil.info("", "获取数据并解析...")
//         let list = PoloniexTask.mTokenList;
//         LogUtil.info("token数量", "" + PoloniexTask.mTokenList.length + " 索引：" + index)

//         if(PoloniexTask.mTokenList.length > 0 && list[index] != null){
//                 let datasByDay = await test.getChartData(list[index].tokenA, list[index].tokenB, DurationType.DAY_1)
//                 let data = await test.getChartData(list[index].tokenA, list[index].tokenB, DurationType.MIN_30)
//                 let tokenUtil = new TokenUtil();
//                 tokenUtil.analyze(list[index].tokenA + "/" + list[index].tokenB, datasByDay, data);
//                 if(index < PoloniexTask.mTokenList.length-1){
//                         index++;
//                 }else{
//                         index = 0;
//                         clearInterval(timer)
//                         TokenUtil.ShowTriggeredTokens()
//                         process.exit();
//                 }
//         }

// }, 3000);


// /* test case 3 */
// PoloniexTask.updateListAndPrice()
// let test = new PoloniexTask();

// let timer = setInterval(async() => {
//         LogUtil.info("", "获取数据并解析...")
//         if(PoloniexTask.mBTCPriceByDollar != 0){
//                 LogUtil.info("", "开始购买...")
//                 clearInterval(timer)
//                 let result = await test.autoBuy("BTC", "ETH")
//                 if(result){
//                         LogUtil.info("success", "")
//                 }
//         }

// }, 3000);
