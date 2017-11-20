import { Component } from '@angular/core';

@Component({
  selector: 'btnas-editor',
  template: `
  <div style="display:block;overflow:hidden">
    <div id="setting" style="position:absolute;height:80%;width:260px;display:block;background-color:blue">
        <p>functions</p>
        <button type="button" value="submit" (click)="onClick()" 
        style="display:block" style="width:100px;height:20px;color:black">
        </button>
    </div>
    <div style="width:100%;height:80%">
        <pre id="editor" style="position:absolute;left:280px;height:80%;width:100%"></pre>
    </div>
    </div>
  `
})

export class EditorComponent {
    
    private myText = "hello";
    private ace:any;
    private editor:any;

    constructor(){
    }

    ngOnInit(){
        this.ace = window["ace"];
        this.editor = this.ace.edit("editor");
        this.editor.setTheme("ace/theme/chrome");
        this.editor.session.setMode("ace/mode/golang");
        this.editor.setValue("hello,wolrd")
    }

    onClick = () => {
        let text = this.editor.getValue();
        console.log(text)
    }
}

    