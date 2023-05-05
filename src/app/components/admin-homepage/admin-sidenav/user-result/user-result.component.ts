import { Component } from '@angular/core';






@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})

export class UserResultComponent {
  allUserExamResultPie=true;
  IndividualUserExamResultPie=true;
  allUserExamResultTable=true;


  loadAllUserExamResult(flag:boolean){
    this.allUserExamResultPie=flag;
  }

  loadIndividualUserExamResult(flag:boolean){
    this.IndividualUserExamResultPie=flag;
  }

  loadAllUserExamResultTable(flag:boolean){
    this.allUserExamResultTable=flag;
  }

}

