import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpService } from "./common.service"

@Component({
  selector: 'btnas-app',
  template: `
    <btnas-header></btnas-header>
    <token-list></token-list>
  `,
  providers: [HttpService]
})
export class AppComponent implements OnInit { 

  ngOnInit(): void {
  }
}
