import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CodingQuestion } from 'src/app/model/model/CodingQuestion';
import { Subject } from 'src/app/model/model/Subject';
import { TestCases } from 'src/app/model/model/TestCases';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
interface InputField {
  // value: string;
  input: string;
  output: string;

}

@Component({
  selector: 'app-add-coding-question',
  templateUrl: './add-coding-question.component.html',
  styleUrls: ['./add-coding-question.component.css']
})
export class AddCodingQuestionComponent {

  @Output("loadAddCodingQuestionPage") loadAddCodingQuestionPage = new EventEmitter();

  // Questions :Question=new Question();
    subjects?:Subject[];
    uniqueSubjectNames: string[] = [];
  //  answers : string[] = []
  codingQuestion: CodingQuestion=new CodingQuestion();
  testCases: TestCases=new TestCases();
  testCasesArray:TestCases[]=[];
  questionForm: FormGroup;
  subjectControl = new FormControl();
  selectedsubject?: string;
  subject_id?: number;
  questionContent?: string;
  inputs: InputField[] = [];
  filteredTopics: Subject[] = [];
  codingQuestionId?:number
  getCodingQuestion: CodingQuestion[]=[]
  testcases:TestCases[]=[];
  public Editor = ClassicEditor;
  constructor(private http:HttpClient,private router:Router,private formBuilder: FormBuilder,
    private subjectService : SubjectService)
  {
    // this.subjects=[];
    // this.uniqueSubjectNames=[];
    this.questionForm = this.formBuilder.group({
      question: '',
      options: this.formBuilder.array([this.createOption()])
    });
  }
  ngOnInit(): void {
    this.subjectService.fetchSubjects().subscribe(data=>{
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
      .filter((name) => name !== undefined && name.toLowerCase()==='coding') as string[];
    return [...new Set(uniqueSubjectNames)];
  }




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





  addInput() {
    console.log('Adding input');
    this.inputs.push({ input: '', output: ''});
    console.log(this.inputs);


   // this.inputOutput.push({ input: '', output: '' });
  }
  removeInput(){
    console.log('Removing input');
    this.inputs.pop();
    console.log(this.inputs);
  }


  createOption(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false
    });
  }
  onSubmit(id?:number): void {

    this.codingQuestion.content=this.questionContent;

    this.http.post(`http://localhost:8089/api/subject/${id}/codingquestion`, this.codingQuestion).subscribe(

                  response=>{
                    this.getallcodingquestions(id);
                    Swal.fire("Question added successfully","", "success");
                    // this.goBack();
                  },

                  error=>{
                    Swal.fire("All field must be required","", "error");
                  }
    );

  }
  getallcodingquestions(id?:number){
    this.http.get(`http://localhost:8089/api/subject/${id}/codingquestions`).subscribe((data)=>{
      console.log(data)
      this.getCodingQuestion=this.getCodingQuestion.concat(data)
      this.addTestCases()
    })
  }

  addTestCases()
  {
    this.getCodingQuestion.forEach((data)=>{

      if(data.content===this.questionContent){
        this.codingQuestionId=data.id
      }
    })
console.log(this.inputs)
    this.inputs.forEach((data)=>{
      console.log(data)
      this.testCases.input=data.input;
      this.testCases.expectedOutput=data.output
      console.log(this.testCases)
      this.http.post(`http://localhost:8089/api/addtestcases/${this.codingQuestionId}`,this.testCases).subscribe((data)=>console.log(data))
      // this.testCasesArray=this.testCasesArray.concat(this.testCases)
      // console.log(this.testCasesArray);
      // console.log("*************")

    })

    // this.http.post(`http://localhost:8089/api/addtestcases/${this.codingQuestionId}`,this.testCasesArray).subscribe((data)=>console.log(data))

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

