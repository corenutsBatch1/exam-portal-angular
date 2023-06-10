
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SubjectService } from 'src/app/services/subject.service';



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
    isCheckedA:boolean=false;
    isCheckedB:boolean=false;
    isCheckedC:boolean=false;
    isCheckedD:boolean=false;
   public Editor = ClassicEditor;

  constructor(private http:HttpClient,private router:Router,private subjectService : SubjectService)
  {
    this.subjects=[];
    this.uniqueSubjectNames=[];
  }
  ngOnInit(): void {

    this.subjectService.fetchSubjects().subscribe(data=>{
      console.log(data);
       this.subjects=data;
       console.log(this.subjects);
       console.log("---------------")
      this.uniqueSubjectNames= this.getUniqueSubjectNames(this.subjects);
      console.log("-------=-" + this.uniqueSubjectNames)
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
// Inside your component code

// Function to clear the form fields
clearFormFields() {
  this.Questions = { content: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '', qtype: '' };
  this.isCheckedA=false;
  this.isCheckedB=false;
  this.isCheckedC=false;
  this.isCheckedD=false;

  this.subject_id = undefined;
  this.selectedsubject = ''; // Restore the selected subject
  this.filteredTopics = []; // Update the filtered topics based on the selected subject
}

// Function to handle the "Clear" button click event
onClearClick() {
  this.clearFormFields();
}

  addQuestion(Questions:Question,id?:number){
    this.answers.sort();
    this.Questions.answer = this.answers.join('');
     if(this.answers.length>0){
      this.http.post(`http://54.64.6.102:9033/api/addquestion/${id}`, Questions).subscribe(
        response=>{
          Swal.fire("Question added successfully","", "success");

          this.Questions = { content: '', optionA: '', optionB: '', optionC: '', optionD: '', answer: '', qtype: '' };
          this.isCheckedA=false;
          this.isCheckedB=false;
          this.isCheckedC=false;
          this.isCheckedD=false;
          this.answers=[];

        },
        error=>{
          Swal.fire("All field must be required","", "error");
        }
      );
     }else{
      Swal.fire("All field must be required","", "error");
     }

  }

  checkboxChanged(event: any, optionValue: string) {
    // console.log(event.checked)
    if(optionValue == 'A'){
      this.isCheckedA=true;
    }
    if(optionValue == 'B'){
      this.isCheckedB=true;
    } if(optionValue == 'C'){
      this.isCheckedC=true;
    } if(optionValue == 'D'){
      this.isCheckedD=true;
    }
    console.log(this.isCheckedA);
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
resetForm(){
    (<HTMLFormElement>document.getElementById("questionBank")).reset();

}
goBack() {
  this.loadAddQuestionPage.emit(true);
}

}
