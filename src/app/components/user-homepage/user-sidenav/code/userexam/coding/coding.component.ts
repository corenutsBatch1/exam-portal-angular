
import { Component,Input } from '@angular/core';
import { Output } from './Output';
import { CodingApiService } from '../coding-api.service';
import { MyserviceService } from 'src/app/model/myservice';
import { UserCode } from 'src/app/model/model/UserCode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent {


  code:string ="";
  input:string="";
  examid?:any;
  userCode?:UserCode;
  userid?:any;
  codeOutput ?: Output;
  @Input() id?:any;

  selectedLanguage : string = "";

  constructor(private apiService:CodingApiService,private service:MyserviceService,private http:HttpClient){}
  ngOnInit(): void {
    this.examid=this.service.sendeid();
    this.userid=this.service.sendid();
    console.log(this.id)
    console.log(this.examid)
    console.log(this.userid)

  }
  runCode(code:string) {
    const javaUrl='http://localhost:8089/api/savecode'

    this.userCode={
      language:'java',
      userInputCode:code,
      exam:{
        id:this.examid
      },
      user:{
        id:this.userid
      },
      codingQuestion:{
        id:this.id
      }

    }
      this.http.post(javaUrl,this.userCode).subscribe(response => {
        console.log('Upload successful!');
      }, error => {
        console.error('Upload failed:', error);
      });
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
