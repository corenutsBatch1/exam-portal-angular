
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



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
   answers : string[] = []
   public Editor = ClassicEditor;

  constructor(private http:HttpClient,private router:Router)
  {
    this.subjects=[];
    this.uniqueSubjectNames=[];
  }
  ngOnInit(): void {

    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe(data=>{
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
      .filter((name) => name !== undefined && name.toLowerCase()!=='coding') as string[];
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
      this.filteredTopics = this.subjects!.filter((t) => t.name=== this.selectedsubject);

    } else {
     // this.filteredTopics = undefined;
    }
  }

  addQuestion(Questions:Question,id?:number){
    console.log(Questions)
    console.log(this.subject_id)
    console.log(this.selectedsubject)
    console.log(id)
    this.answers.sort();
    this.Questions.answer = this.answers.join('');

    console.log(this.Questions.answer)
    this.http.post(`http://localhost:8089/api/addquestion/${id}`, Questions).subscribe(

      response=>{
        Swal.fire("Question added successfully","", "success");
        // location.reload();
        // this.goBack();
      },

      error=>{
        Swal.fire("All field must be required","", "error");
      }
    );
  }

  checkboxChanged(event: any, optionValue: string) {
    console.log(event.checked)
    if (event.checked) {
      // Checkbox is checked
      this.answers.push(optionValue);
      console.log(this.answers)
    } else {
      // Checkbox is unchecked
      const index = this.answers.indexOf(optionValue);
      if (index !== -1) {
        this.answers.splice(index, 1);
      }
    }
  }

goBack() {
  this.loadAddQuestionPage.emit(true);
}

}
