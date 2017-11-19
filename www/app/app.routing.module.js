"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const ngx_bootstrap_1 = require("ngx-bootstrap");
const bloglist_component_1 = require("./bloglist.component");
const editor_component_1 = require("./editor.component");
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            forms_1.FormsModule,
            platform_browser_1.BrowserModule,
            ngx_bootstrap_1.PaginationModule.forRoot(),
            // Ng2TableModule,
            // when we refresh the browser, the routers will be lost
            router_1.RouterModule.forRoot([
                { path: 'editor', component: editor_component_1.EditorComponent },
                { path: 'triggers', component: bloglist_component_1.BlogListComponent },
                {
                    path: '',
                    redirectTo: '/editor',
                    pathMatch: 'full'
                },
            ]),
        ],
        declarations: [
            // TokenListComponent,
            bloglist_component_1.BlogListComponent
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
