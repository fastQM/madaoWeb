import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}


@Component({
  selector: 'btnas-banner',
  template: `
  `
})

export class BannerComponent{
    title = "用angular2构建您的BTNAS应用"
    hero:Hero = {
        id: 1,
        name: "maisuid"
    }
}
