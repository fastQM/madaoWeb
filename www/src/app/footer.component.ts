import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}


@Component({
  selector: 'btnas-footer',
  template: `
    <footer id="site-footer" class="site-footer" role="contentinfo">
            <div class="design-credit">
            <span>
                <a href="{{link}}">NAS博客</a> by Mqiu       
            </span>
        </div>
    </footer>
  `
})

export class FooterComponent {
    link = "https://www.btnas.com"
}

    
    

