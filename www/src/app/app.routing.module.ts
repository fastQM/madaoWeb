import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './bloglist.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'blog/:id', component: BlogComponent },
      { path: '', component: BlogListComponent }
    //   { path: '**', component: PageNotFoundComponent }
    ])
  ],
  declarations: [
    BlogComponent,
    BlogListComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}