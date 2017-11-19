"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class Hero {
}
exports.Hero = Hero;
let BannerComponent = class BannerComponent {
    constructor() {
        this.title = "用angular2构建您的BTNAS应用";
        this.hero = {
            id: 1,
            name: "maisuid"
        };
    }
};
BannerComponent = __decorate([
    core_1.Component({
        selector: 'btnas-banner',
        template: `
  `
    })
], BannerComponent);
exports.BannerComponent = BannerComponent;
