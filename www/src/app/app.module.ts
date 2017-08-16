import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent }  from './app.component';
import { HeaderComponent } from './header.component'
import { BannerComponent } from './banner.component'
import { BlogListComponent } from './bloglist.component'
import { AboutComponent } from './about.component'
import { SidebarComponent } from './sidebar.component'
import { FooterComponent } from './footer.component'
import { BlogComponent } from './blog.component'

import { AppRoutingModule } from './app.routing.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AboutComponent,
    SidebarComponent,
    FooterComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }