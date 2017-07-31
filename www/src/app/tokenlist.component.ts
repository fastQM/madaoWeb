import { Component } from '@angular/core'
import { SocketIOService } from "./socketio.service"

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

@Component({
  selector: 'token-list',
  providers: [ SocketIOService ],
  template: `
    <section id="text-3" class="widget widget_text">
        <h2 class="widget-title">{{title}}</h2>			
        <div class="textwidget">
            <p *ngFor="let value of list">{{value}}</p>
        </div>
    </section>
  `
})

export class TokenListComponent{
  title = "Poloniex"
  socket:any
  list:Array<String>

  constructor(socketService:SocketIOService){
    
    let self = this
    self.list = []

    this.socket = socketService.socket
    this.socket.on('update', (info:any)=>{
        console.log("data:" + info)
        // let value:TokenPrice = JSON.parse(datas.data)
        self.list.push(info)
    })

  }
}
