import { Injectable } from '@angular/core';


@Injectable()
export class SocketIOService{

    public socket;

    constructor(){
      this.socket = io()
      this.socket.on('connect', ()=>{
        console.log("connected")
      })
    }

}