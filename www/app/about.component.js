"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let AboutComponent = class AboutComponent {
    constructor() {
        this.title = "关于博客";
        this.texts = ["这是运行在NAS上的私人博客空间.",
            "Angular2的简洁装饰它精美的面容,nodejs和golang的任性塑造它狂野的灵魂",
            "自古以来,博客就是荒芜的私域,隔离的禁岛;这是怎样一种孤独与无声的呐喊呀?",
            "一切即将被打破,精神将被赋予,力量将被释放,疯狂是我们追赶历史的模样..."];
    }
};
AboutComponent = __decorate([
    core_1.Component({
        selector: 'btnas-aboutme',
        template: `
    <section id="text-3" class="widget widget_text">
        <h2 class="widget-title">{{title}}</h2>			
        <div class="textwidget">
            <p *ngFor="let text of texts">{{text}}</p>
        </div>
        <a href="../views/admin.html">管理</a>
    </section>
  `
    })
], AboutComponent);
exports.AboutComponent = AboutComponent;
