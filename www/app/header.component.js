"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let HeaderComponent = class HeaderComponent {
    constructor() {
        //   @Input()
        this.title = "一切尽如您愿";
        this.link = "http://192.168.0.108:8305";
    }
};
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'btnas-header',
        template: `
    <link rel="stylesheet" href="css/header.css">
    <div class="max-width">
        <header class="site-header">
            <div id="menu-primary-container" class="menu-primary-container">
            <div id="menu-primary" class="menu-container menu-primary" role="navigation">
            <nav class="menu"><ul id="menu-primary-items" class="menu-primary-items">
                <li id="menu-item-111" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-111">
                    <a href="/">市场</a>
                </li>
                <li id="menu-item-113" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-113">
                    <a routerLink="/triggers">触发列表</a>
                </li>
                <li id="menu-item-112" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-112">
                    <a href="https://www.competethemes.com/apex-live-demo/sample-page-2/">服务</a>
                    <button class="toggle-dropdown" aria-expanded="false" name="toggle-dropdown" tabindex="-1"><span class="screen-reader-text">open dropdown menu</span></button>
                    <ul class="sub-menu">
                    <li id="menu-item-136" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                        <a href="https://www.competethemes.com/apex-live-demo/dropdown-example-1/">Dropdown Example 1</a>
                    </li>
                    <li id="menu-item-135" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-135">
                        <a href="https://www.competethemes.com/apex-live-demo/dropdown-example-2/">Example Two</a>
                    </li>
                    <li id="menu-item-138" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-138">
                        <a href="https://www.competethemes.com/apex-live-demo/another-page/">Another Page</a>
                        <button class="toggle-dropdown" aria-expanded="false" name="toggle-dropdown" tabindex="-1"><span class="screen-reader-text">open dropdown menu</span></button>
                            <ul class="sub-menu">
                                <li id="menu-item-137" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-137">
                                    <a href="https://www.competethemes.com/apex-live-demo/third-tier-example/">Third Tier Example</a>
                                </li>
                            </ul>
                    </li>
                    </ul>
                </li>
                <li id="menu-item-114" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-114">
                    <a href="https://www.competethemes.com/apex-live-demo/contact/">联系我</a>
                </li>
                </ul>
            </nav>
            </div>
                <ul class="social-media-icons">						
                <li>
                    <a class="twitter" target="_blank" href="http://#">
                        <i class="fa fa-twitter-square" title="twitter"></i>
                        <span class="screen-reader-text">twitter</span>
                    </a>
                </li>
                                        
                <li>
                    <a class="pinterest" target="_blank" href="http://#">
                        <i class="fa fa-pinterest-square" title="pinterest"></i>
                        <span class="screen-reader-text">pinterest</span>
                    </a>
                </li>
                                        
                <li>
                    <a class="instagram" target="_blank" href="http://#">
                        <i class="fa fa-instagram" title="instagram"></i>
                        <span class="screen-reader-text">instagram</span>
                    </a>
                </li>
                                        
                <li>
                    <a class="rss" target="_blank" href="http://#">
                        <i class="fa fa-rss-square" title="rss"></i>
                        <span class="screen-reader-text">rss</span>
                    </a>
                </li>
                </ul>				
            </div>
        </header>
    </div>

  `
    })
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
