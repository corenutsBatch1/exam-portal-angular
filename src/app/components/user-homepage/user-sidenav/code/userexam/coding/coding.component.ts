import { response } from 'express';

import { Component,Input } from '@angular/core';
import { Output } from './Output';
import { CodingApiService } from '../coding-api.service';
import { MyserviceService } from 'src/app/model/myservice';
import { UserCode } from 'src/app/model/model/UserCode';
import { HttpClient } from '@angular/common/http';
import { TestCases } from 'src/app/model/model/TestCases';


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
  codeOutput ?: Output[];
  @Input() id?:any;
  Testcase?:TestCases[]=[];
  Testcases?:any[]=[];
  selectedLanguage : string = "";
  index=0;
  codingMarks=0;
  count:number=0;
   response?:any[];
  constructor(private apiService:CodingApiService,private service:MyserviceService,private http:HttpClient){}
  ngOnInit(): void {
    this.examid=this.service.sendeid();
    this.userid=this.service.sendid();
    console.log(this.id)
    console.log(this.examid)
    console.log(this.userid)

  }
  runCode(code:string) {
    console.log("code")
    console.log(code)
    if(!this.selectedLanguage){
      sweetAlert("Fill All Fields", "Must be select the any programming language", "error");
      return;
    }


    if (this.code=='') {
      sweetAlert("Fill All Fields", "Must be write programming code", "error");
      return;
    }
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
      this.http.get(`http://localhost:8089/api/getalltestcases/${this.id}`).subscribe((data)=>{
        this.Testcase?.splice(0,this.Testcase.length);
       this.Testcase=this.Testcase?.concat(data);

           this.Testcase?.forEach(a=>{
         console.log(a.input+"above")
         this.apiService.runCode(code,this.selectedLanguage,a.input).subscribe(response => {
            console.log(response )
            console.log(response.output )
            console.log(a.expectedOutput)
            if(response.output.trim() === a.expectedOutput) {
                this.count++;
              console.log("Your program is correct.");
            } else {
              console.log("Your program is incorrect.");
            }
             if(this.count==this.Testcase?.length)
             {
                 this.codingMarks=5;
                 this.service.codingmarks(this.codingMarks);
                 console.log(this.codingMarks+"in coding component")
             }

           //  this.response=this.response?.concat(response);
          // console.log(this.response)
           //this.codeOutput = this.codeOutput?.concat(response);


    }, error => {
      console.log(error)
      this.codeOutput = error
    })
          })
          this.http.post(javaUrl,this.userCode).subscribe(response => {
            console.log('Upload successful!');
          }, error => {
            console.error('Upload failed:', error);
          });


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
