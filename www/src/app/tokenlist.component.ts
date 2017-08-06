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
            <p *ngFor="let value of list">
              <a>{{value.pairs}}</a> <a>{{value.last}}</a>
            </p>
        </div>
    </section>
  `
})

export class TokenListComponent{
  title = "Poloniex"
  socket:any
  list:Array<TokenPrice>

  constructor(socketService:SocketIOService){
    
    let self = this
    self.list = []

    this.socket = socketService.socket
    this.socket.on('update', (info:any)=>{
        console.log("update:" + info)
        let value:TokenPrice = {
          pairs: info[ValueIndex.pairs],
          last:info[ValueIndex.last],
          lowestAsk:info[ValueIndex.lowestAsk],
          highestBid:info[ValueIndex.highestBid],
          percentChange:info[ValueIndex.percentChange],
          baseVolume:info[ValueIndex.baseVolume],
          quoteVolume:info[ValueIndex.quoteVolume],
          isFrozen:info[ValueIndex.isFrozen],
          hr24High:info[ValueIndex.hr24High],
          hr24Low:info[ValueIndex.hr24Low]
        }
        let i = 0

        for(i=0;i<self.list.length;i++){
          if(self.list[i].pairs == value.pairs){
            self.list[i] = value;
            return
          }
        }

        if(i==self.list.length){
          self.list.push(value)
        }
    })

  }
}
