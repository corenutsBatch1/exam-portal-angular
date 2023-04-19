import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { Question } from 'src/app/model/model/Question';

@Component({
  selector: 'app-viewPaper',
  templateUrl: './viewPaper.component.html',
  styleUrls: ['./viewPaper.component.css']
})
export class ViewPaperComponent implements OnInit {
questions?:number[]
questionsArray?:Question[]
@Output ('viewPaper')viewPaper =new EventEmitter();
createpaper:CreatePaper=new CreatePaper();
  constructor() { }

  ngOnInit() {
    this.viewPaperQuestions();
  }
  goBack(){
  this.viewPaper.emit(true);
  }
  viewPaperQuestions(){
    this.questions= this.createpaper.questionsListArray
  }

}
