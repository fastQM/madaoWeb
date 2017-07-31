export class TimeUtil{
    
    static TAG = "TimeUtil";
    
    static sleep = async (timeout:number) => {
      return new Promise((resolve:any, reject:any) => {
        setTimeout(function() {
          resolve();
        }, timeout);
      });
    }
}