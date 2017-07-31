import { Component } from '@angular/core';

@Component({
  selector: 'btnas-sidebar',
  template: `
    <aside class="sidebar sidebar-primary" id="sidebar-primary" role="complementary">
        <btnas-aboutme></btnas-aboutme>
    </aside>
  `
})

export class SidebarComponent{
    
    constructor () {}
    
    ngOnInit() { 
        
    }
    
}
