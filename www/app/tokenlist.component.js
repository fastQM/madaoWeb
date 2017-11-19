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
const web3_service_1 = require("./web3.service");
var ValueIndex;
(function (ValueIndex) {
    ValueIndex[ValueIndex["pairs"] = 0] = "pairs";
    ValueIndex[ValueIndex["last"] = 1] = "last";
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
    constructor(socketService, web3Service) {
        this.title = "Poloniex";
        let self = this;
        self.list = [];
        this.socket = socketService.socket;
        this.socket.on('update', (info) => {
            console.log("data:" + info);
            // let value:TokenPrice = JSON.parse(datas.data)
            self.list.push(info);
        });
    }
};
TokenListComponent = __decorate([
    core_1.Component({
        selector: 'token-list',
        providers: [socketio_service_1.SocketIOService, web3_service_1.Web3Service],
        template: `
    <section id="text-3" class="widget widget_text">
        <h2 class="widget-title">{{title}}</h2>			
        <div class="textwidget">
            <p *ngFor="let value of list">{{value}}</p>
        </div>
    </section>
  `
    }),
    __metadata("design:paramtypes", [socketio_service_1.SocketIOService, web3_service_1.Web3Service])
], TokenListComponent);
exports.TokenListComponent = TokenListComponent;
