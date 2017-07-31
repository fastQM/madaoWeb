import {HttpUtil} from "./HttpUtil"

let moment = require("moment");


export class StockYahoo{
    
    loadHistoryData = async (code:string, years:number) => {
        
        let today = {year:2016, month:1, date:1};
        today.year = moment().format('YYYY');
        today.month = moment().format('MM')-1;
        today.date = moment().format('DD');

        // console.log('today:' + JSON.stringify(today));

        var startMoment = moment().subtract(1, 'years');
        var start = {year:2016, month:1, date:1};
        start.year = startMoment.format('YYYY');
        start.month = startMoment.format('MM')-1;
        start.date = startMoment.format('DD');

        // console.log('start:' + JSON.stringify(start));

        let suffix = '.sz';
        if(code.charAt(0) == '6'){
            suffix = '.ss';
        }

        let link = "http://table.finance.yahoo.com" + "/table.csv?s=" +　code +　suffix 
                + "&d=" + today.month +"&e=" + today.date + "&f=" + today.year 
                + "&g=d&a=" + start.month + "&b=" + start.date + "&c=" + start.year + "&ignore=.csv";
    
        let http = new HttpUtil();
        http.addRequest(link);
        let datas = await http.start(1);
        return datas;
    }
    
}