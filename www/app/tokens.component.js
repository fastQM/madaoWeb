"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const socketio_service_1 = require("./socketio.service");
var ValueIndex;
(function (ValueIndex) {
    ValueIndex[ValueIndex["pairs"] = 0] = "pairs";
    ValueIndex[ValueIndex["value"] = 1] = "value";
    ValueIndex[ValueIndex["lowestAsk"] = 2] = "lowestAsk";
    ValueIndex[ValueIndex["highestBid"] = 3] = "highestBid";
    ValueIndex[ValueIndex["percentChange"] = 4] = "percentChange";
    ValueIndex[ValueIndex["baseVolume"] = 5] = "baseVolume";
    ValueIndex[ValueIndex["quoteVolume"] = 6] = "quoteVolume";
    ValueIndex[ValueIndex["isFrozen"] = 7] = "isFrozen";
    ValueIndex[ValueIndex["hr24High"] = 8] = "hr24High";
    ValueIndex[ValueIndex["hr24Low"] = 9] = "hr24Low";
})(ValueIndex = exports.ValueIndex || (exports.ValueIndex = {}));
let TokenListComponent = class TokenListComponent {
    // public ngOnInit():void {
    //   this.onChangeTable(this.config);
    // }
    constructor(socketService) {
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.title = "Poloniex";
        this.rows = [];
        this.columns = [
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
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        let self = this;
        self.list = [];
        this.socket = socketService.socket;
        this.socket.on('update', (info) => {
            console.log("update:" + info);
            let value = {
                pairs: info[ValueIndex.pairs],
                value: info[ValueIndex.value],
                lowestAsk: info[ValueIndex.lowestAsk],
                highestBid: info[ValueIndex.highestBid],
                percentChange: info[ValueIndex.percentChange],
                baseVolume: info[ValueIndex.baseVolume],
                quoteVolume: info[ValueIndex.quoteVolume],
                isFrozen: info[ValueIndex.isFrozen],
                hr24High: info[ValueIndex.hr24High],
                hr24Low: info[ValueIndex.hr24Low]
            };
            let i = 0;
            for (i = 0; i < self.list.length; i++) {
                if (self.list[i].pairs == value.pairs) {
                    self.list[i] = value;
                    return;
                }
            }
            if (i == self.list.length) {
                self.list.push(value);
                self.length = self.list.length;
                self.rows = self.list;
            }
        });
    }
};
TokenListComponent = __decorate([
    core_1.Component({
        selector: 'token-list',
        providers: [socketio_service_1.SocketIOService],
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
    }),
    __metadata("design:paramtypes", [socketio_service_1.SocketIOService])
], TokenListComponent);
exports.TokenListComponent = TokenListComponent;
