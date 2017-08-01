// export interface ChartValue{
//         date:number,
//         highTotal:number,
//         lowTotal:number,
//         open:number,
//         close:number,
//         volume:number,
//         quoteVolume:number,
//         weightedAverage:number
// }

import {ChartValue} from "../task/PoloniexTask"
import {LogUtil} from "./LogUtil"
import {FileUtil} from "./FileUtil"

// var momentUtil = require("moment")
var momentUtil = require('moment-timezone');

export interface TriggeredToken{
        name:string,
        date:number,
        buy:number,
        sellLimitHigh:number,   // 止盈
        sellLimitLow:number,       // 止损
        buySuccess:boolean
}



export class TokenUtil{

    public static format = "YYYY-MM-DD HH:mm"
    public static tzLondon = "Europe/London"
    public static tzPoloniex = "America/Danmarkshavn"
    private tokeName:string
    private values:Array<ChartValue>

    private higest:number
    private lowest:number

    private static mTriggered:Array<TriggeredToken> = []
    private static fs = new FileUtil("./log.txt")

    public static AddTrrggeredToken(token:TriggeredToken){
            TokenUtil.mTriggered.push(token)
            TokenUtil.fs.WriteLine(JSON.stringify(token))
    }

    public static ShowTriggeredTokens(){

            LogUtil.info("触发列表", "**************************************************")

            TokenUtil.mTriggered.forEach(element => {
                    LogUtil.info("", "---------------------------------------------------")
                    LogUtil.info(element.name, "Date:" + element.date)
                    LogUtil.info(element.name, "Buy:" + element.buy)
                    LogUtil.info(element.name, "SellLimitHigh:" + element.sellLimitHigh)
                    LogUtil.info(element.name, "SellLimitLow:" + element.sellLimitLow)
                    LogUtil.info("", "---------------------------------------------------")
            });

            LogUtil.info("触发列表", "**************************************************")
    }

    public analyze(tokenName:string, arrayDays:Array<ChartValue>, array:Array<ChartValue>){

        this.tokeName = tokenName
        this.values = array;

        let lowTotal = 0
        let highTotal = 0
        let lowest = 0
        let highest = 0

        array.forEach(element => {
            
            lowTotal += element.low;
            highTotal += element.high;

            if(lowest == 0 || element.low < lowest){
                lowest = element.low
            }

            if(highest == 0 || element.high > highest){
                highest = element.high
            }

            // LogUtil.info("时间:", momentUtil.unix(element.date).tz(TokenUtil.tzPoloniex).format(TokenUtil.format)
            //     + " 高:" + element.high
            //     + " 低:" + element.low
            //     + " 成交量:" + element.volume
            //     + " 波动:" + (element.high-element.low)/element.low);
        });

        LogUtil.info(this.tokeName, "最高:" + highest + " 最低:" + lowest + " 波动:" + ((highest-lowest)/lowest));

        this.higest = highest
        this.lowest = lowest

        // this.searchBuyByLowest();
        this.searchBuyHighVolumn()

    }

    // 查找连续5个下跌的点，并且最后一个放量
    private searchBuyByLowest = () => {

        let counter = 0
        let values = this.values;

        for(let i=1;i<values.length;i++){

            // LogUtil.info("时间:", momentUtil.unix(values[i].date).tz(TokenUtil.tzPoloniex).format(TokenUtil.format)
            //     + " 高:" + values[i].high
            //     + " 低:" + values[i].low
            //     + " 成交量:" + values[i].volume);

            if(true
            && (values[i].volume > 1.1*values[i-1].volume)  // 成交量持续放大 
            ){
                if(counter>0){
                    if(values[i-1].low > (values[i].low*1.01)){ // 开始计数后才要去判断和之前的跌幅 
                        counter++
                    }else{
                        counter = 0
                    }
                }else{
                    counter++
                }
            }else{
                counter = 0;
            }

            // 连续五次下跌，并且最后下跌放量5倍
            // if(counter>=3 && values[i].volume > 5*values[i-1].volume){
            if(counter>=2){
                LogUtil.info(this.tokeName, "====================================")
                LogUtil.info(this.tokeName, momentUtil.unix(values[i].date)
                .tz(TokenUtil.tzPoloniex).format(TokenUtil.format) + " Average:" + values[i].weightedAverage)
                LogUtil.info(this.tokeName, "建议买入价格：" + values[i].close*1.01 + " 建议卖出价格：" + values[i].close*1.01*1.03)

                if(values[i-2].close*1.01*1.03 > this.higest){
                    LogUtil.info(this.tokeName, "超出时间段最高价，不宜买入")
                    return
                }

                if(values[i+1] != null){
                    LogUtil.info(this.tokeName, "第二日可成交价格：" + values[i].low)
                }

                for(let m=1;m<10;m++){
                    if(values[i+m]!= null){
                        if(values[i+m].high > values[i].close*1.01*1.03){
                            LogUtil.info(this.tokeName, "可以成功卖出！！！")
                        }
                    }else{
                        break;
                    }
                }

                LogUtil.info(this.tokeName, "====================================")
            }
        }

    }


    private searchBuyHighVolumn = () => {

        let counter = 0
        let values = this.values;

        for(let i=5;i<values.length;i++){

            // LogUtil.info("时间:", momentUtil.unix(values[i].date).tz(TokenUtil.tzPoloniex).format(TokenUtil.format)
            //     + " 高:" + values[i].high
            //     + " 低:" + values[i].low
            //     + " 成交量:" + values[i].volume);

            if(values[i].volume > 3 * values[i-1].volume // 成交量突然放大 
            && (values[i].close < values[i].open)   // 下跌
            && ((values[i].close - values[i].low)/values[i].low > 0.01))  // 下引线
            // && (values[i-1].low > (values[i].low*1.01))    // 低点跌幅大于1
            {
                for(let j=5;j>=0;j--){
                    if(values[i-j].close < values[i-j].open){   // 五天中有三天下跌
                        // LogUtil.info("满足", momentUtil.unix(values[i-j].date).tz(TokenUtil.tzPoloniex).format(TokenUtil.format) )
                        counter++;
                    }

                }

                if(counter>=3){

                    let token:TriggeredToken = {
                        name: this.tokeName,
                        date: momentUtil.unix(values[i].date).tz(TokenUtil.tzPoloniex).format(TokenUtil.format),
                        buy: values[i].close*1.01,
                        sellLimitHigh: values[i].close*1.01*1.03,
                        sellLimitLow: 0,
                        buySuccess: false
                    }

                    TokenUtil.AddTrrggeredToken(token)

                    LogUtil.info(this.tokeName, "====================================")
                    LogUtil.info(this.tokeName, token.date + " Average:" + values[i].weightedAverage)
                    LogUtil.info(this.tokeName, "建议买入价格：" + token.buy + " 建议卖出价格：" + token.sellLimitHigh)



                    if(values[i-2].close*1.01*1.03 > this.higest){
                        LogUtil.info(this.tokeName, "超出时间段最高价，不宜买入")
                        return
                    }

                    for(let m=1;m<10;m++){
                        if(values[i+m]!= null){
                            if(values[i+m].high > token.sellLimitHigh){
                                LogUtil.info(this.tokeName, "可以成功卖出！！！")
                                break;
                            }
                        }
                    }

                    if(values[i+1] != null && values[i+1].low < token.buy){
                        LogUtil.info(this.tokeName, "可以在第二日成交：" + values[i].low)
                    }

                    LogUtil.info(this.tokeName, "====================================")
                }

                counter = 0;


            }


        }

    }

    public checkSell = () => {
        


    }

}