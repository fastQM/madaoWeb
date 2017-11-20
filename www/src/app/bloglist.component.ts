import { Component } from '@angular/core';
import { HttpService } from "./common.service";
import { BlogStructs } from "./common.define";
import { SocketIOService } from "./socketio.service";

@Component({
  selector: 'btnas-blog-list',
  template: `
    <section class="main">
        <div class="loop-container">
            <div *ngFor="let blog of blogs">
                <div class="post-44 post type-post status-publish format-standard has-post-thumbnail sticky hentry category-cooking category-news tag-blogging tag-funny tag-new entry">
                  <article>
                    <div class="featured-image">
                        <a href="https://www.competethemes.com/apex-live-demo/2015/02/10/four-stunning-new-layouts/">From State to State
                            <img width="1280" height="853" 
                                src="https://www.competethemes.com/apex-live-demo/wp-content/uploads/sites/43/2015/02/golden-gate-bridge.jpg" 
                                class="attachment-full size-full wp-post-image" alt="golden-gate-bridge" 
                                srcset="https://www.competethemes.com/apex-live-demo/wp-content/uploads/sites/43/2015/02/golden-gate-bridge.jpg 1280w, 
                                https://www.competethemes.com/apex-live-demo/wp-content/uploads/sites/43/2015/02/golden-gate-bridge-300x200.jpg 300w, 
                                https://www.competethemes.com/apex-live-demo/wp-content/uploads/sites/43/2015/02/golden-gate-bridge-1024x682.jpg 1024w" 
                                sizes="(max-width: 1280px) 100vw, 1280px">
                        </a>
                    </div>		
                    <div class="post-container">
                        <div class="post-header">
                            <div class="sticky-status"><span>{{blog.tag}}</span></div>				
                            <h2 class="post-title">
                                <a routerLink="/blog/123" routerLinkActive="active">{{blog.title}}</a>
                            </h2>
                            <div class="post-byline">
                                <span class="post-date">{{blog.time}}</span>
                                </div>			
                            </div>
                        <div class="post-content">
                            <p>{{blog.content}}</p>
                            <p><a class="more-link" href="https://www.competethemes.com/apex-live-demo/2015/02/10/four-stunning-new-layouts/">更多
                            <span class="screen-reader-text">From State to State</span></a></p>				
                            <span class="comments-link">
                                <i class="fa fa-comment" title="comment icon"></i>
                                <a href="https://www.competethemes.com/apex-live-demo/2015/02/10/four-stunning-new-layouts/#comments">{{blog.commentNumber}} Comments</a>
                            </span>			
                        </div>
                    </div>
                </article>
              </div>
            </div>
        </div>
    </section>
  `
})

export class BlogListComponent{
    
    errorMessage: string;
    blogs: BlogStructs[];
    mode = 'Observable';
    test:string;

    constructor (private blogService: HttpService, private socket: SocketIOService) {}
    
    ngOnInit() { 
        this.blogs = [new BlogStructs("金门大桥", "只有创造才能让激情永驻", "Published February 10, 2015", 
                                "乌溜溜的黑眼珠和你的笑脸怎么也难忘记你容颜的转变轻飘飘的旧时光就这么溜走转头回去看看时已匆匆数年", 10),
                      new BlogStructs("金门大桥", "只有创造才能让激情永驻", "Published February 10, 2015", 
                                "乌溜溜的黑眼珠和你的笑脸怎么也难忘记你容颜的转变轻飘飘的旧时光就这么溜走转头回去看看时已匆匆数年", 10)];
                                    
        console.log("init");
        this.blogService.get<string>("/user/test")
                        .subscribe(
                            test => {
                                this.test = test;
                                console.log("result:" + JSON.stringify(this.test));
                            },
                            error =>  {
                                this.errorMessage = <any>error;
                            }
                        );                                   
    }
    

}
