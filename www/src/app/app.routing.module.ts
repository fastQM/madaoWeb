import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap';
// import { Ng2TableModule } from 'ng2-table/ng2-table';

import {TokenListComponent} from "./tokens.component"
import { BlogListComponent } from './bloglist.component';
import { EditorComponent } from './editor.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    PaginationModule.forRoot(),
    // Ng2TableModule,
    // when we refresh the browser, the routers will be lost
    RouterModule.forRoot([
      { path: 'editor', component: EditorComponent },
      { path: 'triggers', component: BlogListComponent },
      { 
        path: '',
        redirectTo: '/editor',
        pathMatch: 'full'
      },
    ]),
  ],
  declarations: [
    // TokenListComponent,
    BlogListComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}