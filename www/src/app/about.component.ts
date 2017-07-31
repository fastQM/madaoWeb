import { Component } from '@angular/core';

@Component({
  selector: 'btnas-aboutme',
  template: `
    <section id="text-3" class="widget widget_text">
        <h2 class="widget-title">{{title}}</h2>			
        <div class="textwidget">
            <p *ngFor="let text of texts">{{text}}</p>
        </div>
        <a href="../views/admin.html">管理</a>
    </section>
  `
})

export class AboutComponent{
    title = "关于博客"
    texts = ["这是运行在NAS上的私人博客空间.",
              "Angular2的简洁装饰它精美的面容,nodejs和golang的任性塑造它狂野的灵魂",
              "自古以来,博客就是荒芜的私域,隔离的禁岛;这是怎样一种孤独与无声的呐喊呀?",
              "一切即将被打破,精神将被赋予,力量将被释放,疯狂是我们追赶历史的模样..."];
}
