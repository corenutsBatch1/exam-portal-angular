import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {
  showQuestion:boolean=true;
  manageQuestions:boolean=true;
  constructor(private route:Router) { }

  ngOnInit() {

  }
  loadAddQuestionPage(flag:boolean){
    // alert("route ")
    this.showQuestion=flag;
  }
  loadManageQuestionPage(flag:boolean){
    // alert("route ")
    this.manageQuestions=flag;
  }


}
