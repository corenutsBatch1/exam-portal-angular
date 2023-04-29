import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CodingQuestion } from 'src/app/model/model/CodingQuestions';
import { Subject } from 'src/app/model/model/Subject';
interface InputField {
  value: string;
}
@Component({
  selector: 'app-add-coding-question',
  templateUrl: './add-coding-question.component.html',
  styleUrls: ['./add-coding-question.component.css']
})
export class AddCodingQuestionComponent {

  @Output("loadAddCodingQuestionPage") loadAddCodingQuestionPage = new EventEmitter();
  subjectControl = new FormControl();
  // Questions :Question=new Question();
    subjects?:Subject[];
    uniqueSubjectNames: string[] = [];
  //  answers : string[] = []
  codingQuestion: CodingQuestion=new CodingQuestion();
  questionForm: FormGroup;

  constructor(private http:HttpClient,private router:Router,private formBuilder: FormBuilder)
  {
    // this.subjects=[];
    // this.uniqueSubjectNames=[];
    this.questionForm = this.formBuilder.group({
      question: '',
      options: this.formBuilder.array([this.createOption()])
    });
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


  inputs: InputField[] = [];

  addInput() {
    this.inputs.push({ value: '' });
  }
  removeInput(){
    this.inputs.pop();
  }
//This is chatgpt code

  createOption(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false
    });
  }

  // addOption(): void {
  //   const options = this.questionForm.get('options') as FormArray;
  //   options.push(this.createOption());
  // }

  // removeOption(index: number): void {
  //   const options = this.questionForm.get('options') as FormArray;
  //   options.removeAt(index);
  // }

  onSubmit(codingQuestions:CodingQuestion,id?:number): void {
    this.http.post(`http://localhost:8089/api/addquestion/${id}`,codingQuestions )
  }
  addTestCases(){
    
  }


  // addQuestion(Questions:Question,id?:number){
  //   console.log(Questions)
  //   console.log(this.subject_id)
  //   console.log(this.selectedsubject)
  //   console.log(id)
  //   this.answers.sort();
  //   this.Questions.answer = this.answers.join('');
  //   console.log(this.Questions.answer)
  //   this.http.post(`http://localhost:8089/api/addquestion/${id}`, Questions).subscribe(
  //     response=>{
  //       swal("Question added successfully","", "success");
  //       // this.goBack();
  //     }
  //   );
  // }
  // checkboxChanged(event: any, optionValue: string) {
  //   if (event.checked) {
  //     // Checkbox is checked
  //     this.answers.push(optionValue);
  //   } else {
  //     // Checkbox is unchecked
  //     const index = this.answers.indexOf(optionValue);
  //     if (index !== -1) {
  //       this.answers.splice(index, 1);
  //     }
  //   }
  // }

goBack() {
  this.loadAddCodingQuestionPage.emit(true);
}


}
