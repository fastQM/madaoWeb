import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpService } from "./common.service"

@Component({
  selector: 'btnas-app',
  template: `
    <a href="">this is amazing</a>
  `,
  providers: [HttpService]
})
export class BlogComponent implements OnInit { 
    
  ngOnInit(): void {
      
  }
}
