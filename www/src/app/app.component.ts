import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpService } from "./common.service";
import { SocketIOService } from "./socketio.service";

@Component({
  selector: 'btnas-app',
  template: `
    <router-outlet></router-outlet>
  `,
  providers: [HttpService, SocketIOService]
})
export class AppComponent implements OnInit { 

  ngOnInit(): void {
  }
}
