
import { Component } from '@angular/core';
import { Output } from './Output';
import { CodingApiService } from '../coding-api.service';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent {

  code:string ="";
  input:string="";
  codeOutput ?: Output;

  selectedLanguage : string = "";

  constructor(private apiService:CodingApiService){}

  runCode(code:string) {
    this.apiService.runCode(code,this.selectedLanguage,this.input).subscribe(response => {
      console.log(response)
      this.codeOutput = response
    }, error => {
      console.log(error)
      this.codeOutput = error
    })
    }

    codeMirrorOptions: any = {
      lineNumbers: true,
      theme: 'material',
      mode: 'python',
      indentWithTabs: true,
      smartIndent: true,
      lineWrapping: false,
      extraKeys: { "Ctrl-Space": "autocomplete" },
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true
    };
}
