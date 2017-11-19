"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_service_1 = require("./common.service");
const socketio_service_1 = require("./socketio.service");
let AppComponent = class AppComponent {
    ngOnInit() {
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'btnas-app',
        template: `
    <router-outlet></router-outlet>
  `,
        providers: [common_service_1.HttpService, socketio_service_1.SocketIOService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
