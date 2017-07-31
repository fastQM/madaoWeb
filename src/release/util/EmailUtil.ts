import {LogUtil} from "../util/LogUtil"

let mailer = require('nodemailer');

export class EmailUtil{
    
    private static TAG = "";
    
    public static send = () => {
        let transporter = mailer.createTransport('smtps://50148363%40qq.com:qiu51751732@smtp.qq.com');
        
        transporter.sendMail({
            text:    "i hope this works", 
            from:    "test <50148363@qq.com>", 
            // to:      "someone <someone@your-email.com>, another <another@your-email.com>",
            to: "sales <sales@tingriver.com>",
            // cc:      "else <else@your-email.com>",
            subject: "testing emailjs"
        }, function(err:Error, message:string){
            
             if(err == null){
                 LogUtil.info(EmailUtil.TAG, "mail is sent successfully");
             }
             else{
                 LogUtil.error(EmailUtil.TAG, "mail is Not sent:" + err);
             }
             
             return;
        
        });
    }
    
    
}
