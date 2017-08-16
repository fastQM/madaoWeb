import { Component } from '@angular/core'
import { SocketIOService } from "./socketio.service"

export interface TokenPrice{
        pairs:string
        value:string
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
        value,
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
        <div class="row">
        <div class="col-md-4">
            <input *ngIf="config.filtering" placeholder="查找"
                [ngTableFiltering]="config.filtering"
                class="form-control"
                (tableChanged)="onChangeTable(config)"/>
        </div>
        </div>
        <br>
        <ng-table [config]="config"
                (tableChanged)="onChangeTable(config)"
                (cellClicked)="onCellClick($event)"
                [rows]="rows" [columns]="columns">
        </ng-table>
        <pagination *ngIf="config.paging"
                    class="pagination-sm"
                    [(ngModel)]="page"
                    [totalItems]="length"
                    [itemsPerPage]="itemsPerPage"
                    [maxSize]="maxSize"
                    [boundaryLinks]="true"
                    [rotate]="false"
                    (pageChanged)="onChangeTable(config, $event)"
                    (numPages)="numPages = $event">
        </pagination>
        <pre *ngIf="config.paging" class="card card-block card-header">Page: {{page}} / {{numPages}}</pre>
  `
})

export class TokenListComponent{
  
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public title:string = "Poloniex";
  private socket:any;
  private list:Array<TokenPrice>;

  public rows:Array<any> = [];

  public columns:Array<any> = [
    {
      title: 'Name', 
      name: 'pairs',
      sort: 'asc',
    },
    {
      title: 'Value',
      name: 'value',
      sort: false,
    },
    {
      title: 'Volume',
      name: 'baseVolume',
      sort: true,
    },
    {
      title: 'Change', 
      name: 'percentChange', 
      sort: true,
    },
  ];

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  // public ngOnInit():void {
  //   this.onChangeTable(this.config);
  // }

  constructor(socketService:SocketIOService){
    
    let self = this
    self.list = []

    this.socket = socketService.socket
    this.socket.on('update', (info:any)=>{
        console.log("update:" + info)
        let value:TokenPrice = {
          pairs: info[ValueIndex.pairs],
          value:info[ValueIndex.value],
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
          self.length = self.list.length
          self.rows = self.list
        }
    })

  }
}
