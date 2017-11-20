import { Injectable } from '@angular/core';

@Injectable()
export class SocketIOService{

    public socket;

    constructor(){
      let io = window["io"];
      this.socket = io()
      this.socket.on('connect', ()=>{
        console.log("connected")
      })
    }

}