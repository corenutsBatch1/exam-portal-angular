import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    
  }
  loadAddQuestionPage(){
    // alert("route ")
    this.showQuestion=false;
    this.route.navigate(['adminpage/questionbank/addquestions'])
  }
  showQuestion:boolean=true;
}
