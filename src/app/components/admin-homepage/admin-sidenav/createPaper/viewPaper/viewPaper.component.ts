import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { Question } from 'src/app/model/model/Question';

@Component({
  selector: 'app-viewPaper',
  templateUrl: './viewPaper.component.html',
  styleUrls: ['./viewPaper.component.css']
})
export class ViewPaperComponent implements OnInit {
questions?:number[]
questionsArray:Question[]=[];
@Output ('viewPaper')viewPaper =new EventEmitter();
@Input() paperid?:any;
paper:CreatePaper=new CreatePaper();
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.paper.id=this.paperid;
    console.log(this.paperid)
    console.log(this.paper.id)
    this.viewPaperQuestions(this.paper);
  }
  goBack(){
  this.viewPaper.emit(true);
  }
  viewPaperQuestions(paper2:CreatePaper){
this.http.post<Question[]>(`http://localhost:8089/api/questionsbypaper`,paper2).subscribe(data=>{
  console.log(paper2.id)
  this.questionsArray=this.questionsArray.concat(data);
})
  }

}
