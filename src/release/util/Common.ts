import {LogUtil} from "./LogUtil"

import * as child_process from "child_process";
import * as util from "util";

const TAG = "COMMON";

export interface PROMISE_RETURN{
    err:string,
    data?: any
}

export async function execute(command:string){
    const exec = util.promisify(child_process.exec);
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

export function isContains(str:string, substr:string):boolean{
    return new RegExp(substr).test(str);
}

export function sort(key:string, array:Array<any>, increase:boolean):Array<any>{
    
    try{
        var sortFunc = function(a:any, b:any){
            return b[key].localeCompare(a[key]);
        }

        // 排序
        if(Array.isArray(array) && (array.length != 0)){
            array.sort(sortFunc);
        }
        // 删除重复项
        for(let i=0;i<array.length;){
            if(array[i][key].localeCompare(array[i+1][key]) == 0){
                array.splice(i+1, 1);
                continue;
            }
            i++;
        }
        return array;
    }catch(err){
        LogUtil.error(TAG, "sort exception:" + err)
    }
    
    return null;
}

export function sortStringArray(array:Array<string>, increase:boolean):Array<string>{
    
    try{
        var sortFunc = function(a:string, b:string){
            if(increase){
                return a.localeCompare(b);
            }else{
                return b.localeCompare(a);
            }
        }

        // 排序
        if(Array.isArray(array) && (array.length != 0)){
            array.sort(sortFunc);
        }
        // 删除重复项
        for(let i=0;i<array.length;){
            if(array[i].localeCompare(array[i+1]) == 0){
                array.splice(i+1, 1);
                continue;
            }
            i++;
        }
        
        return array;
    }catch(err){
        LogUtil.error(TAG, "sort exception:" + err)
    }
    
    return null;
}

export function binarySearch(array:Array<any>, target:any, key:string):number{
    let low = 0, mid = 0;
    let high = array.length-1;

    try{
        while (low<=high)  
        {
            mid = Math.ceil((low+high)/2); 

            if(target[key].localeCompare(array[mid][key]) == 0)
                return mid;  
            if(target[key].localeCompare(array[mid][key]) > 0)  
                high=mid-1;  
            if(target[key].localeCompare(array[mid][key]) < 0)  
                low=mid+1;  
        }
    }
    catch(err){
        LogUtil.error(TAG, "binarySearch exception:" + err)
    }
    return -1;    // 如果没有找到
}

export function trimString(source:string, trimLength:number):string {
  
	let destLength = 0;  
	let srcLength = 0;  
	let trimString:string;  
	srcLength = source.length;  
	for(let i = 0; i < srcLength; i++)  
	{  
		let a = source.charAt(i);  
        destLength++;

    	trimString = trimString.concat(a);  
    	if(destLength>=trimLength)  
     	{  
   			trimString = trimString.concat("...");  
         	return trimString;  
      	}  
	}  
    //如果给定字符串小于指定长度，则返回源字符串；  
    if(destLength < trimLength){  
     	return  source;  
	} 
}