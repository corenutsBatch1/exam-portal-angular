
import { Component, OnInit, Directive, EventEmitter, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormControl } from '@angular/forms';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})

export class AddquestionComponent implements OnInit{

  @Output("loadAddQuestionPage") loadAddQuestionPage = new EventEmitter();
  subjectControl = new FormControl();
  Questions :Question=new Question();
   subjects?:Subject[];
   uniqueSubjectNames: string[] = [];
  constructor(private http:HttpClient,private router:Router)
  {
    this.subjects=[];
    this.uniqueSubjectNames=[];
  }
  ngOnInit(): void {

    this.http.get<Subject[]>(`http://localhost:8088/api/getAllSubjects`).subscribe(data=>{
      console.log(data);
       this.subjects=data;
       console.log(this.subjects);
       console.log("---------------")
      this.uniqueSubjectNames= this.getUniqueSubjectNames(this.subjects);
    })
  }

  getUniqueSubjectNames(subjects: Subject[]): string[] {
    console.log("---pppppppppppppp")
    console.log(subjects)
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

   subject_id?:number;
   selectedsubject?:string;
   filteredTopics: Subject[] = [];
   onSubjectSelection() {
    //const value = event.value;
    if (this.selectedsubject) {
      console.log("==============")
      // Filter topics based on selected subject
      console.log(this.selectedsubject)
      console.log(this.subjects)
      this.filteredTopics = this.subjects!.filter((t) => t.name === this.selectedsubject);

    } else {
     // this.filteredTopics = undefined;
    }
  }

   addQuestion(Questions:Question,id?:number){
    console.log(Questions)
    console.log(this.subject_id)
    console.log(this.selectedsubject)
    console.log(id)
    this.http.post(`http://localhost:8088/api/addquestion/${id}`, Questions).subscribe(data=>
    console.log(data))

  }
//   backClicked() {
// this.route.navigate(["/adminpage/questionbank"])
//   }
goBack() {
  this.loadAddQuestionPage.emit(true);
}


}
