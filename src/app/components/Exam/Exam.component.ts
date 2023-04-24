import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { useranswer } from 'src/app/model/model/useranswer';
import { MyserviceService } from 'src/app/model/myservice';



@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  code?: any;
  currentQuestion?: Question ;
  subjectId?:number;
  uid:any;
  eid:any;
  questions: Question[] = [];
  subjects: Subject[] =[];
  selectedOptions: string[] = [];
  answer:useranswer=new useranswer() ;
  uniqueSubjectNames: String[] =[];
  constructor(private http: HttpClient,private route:ActivatedRoute,private service:MyserviceService) {}

  ngOnInit(): void {
    this.uid=this.service.sendid();
    this.eid=this.service.sendeid();

    this.route.params.subscribe(params => {
      this.code = params['code'];
      console.log('Exam code:', this.code);
      this.loadSubjects().subscribe((subjects: Subject[]) => {
          this.subjects = subjects;
          this.uniqueSubjectNames = this.getUniqueSubjectNames(this.subjects)
          //console.log(this.questions)
        });
    });
  }

  getUniqueSubjectNames(subjects: Subject[]): String[] {
    const uniquesubjects = subjects
      .map((subjects) => subjects.name)
      .filter((name) => name !== undefined) as String[];
    return [...new Set(uniquesubjects)];
  }

  loadSubjects(): Observable<Subject[]> {
    return this.http.post<Subject[]>(`http://localhost:8089/api/getsubjectsBycode/${this.code}`,this.code);
  }

  getQuestionsBySubjectName(subjectName:String):void{
    this.questions=[];
   // this.currentQuestion={};
    this.subjects.forEach((subject)=>{
                  if(subject.name==subjectName){
                    this.loadQuestions(subject.id).subscribe((data)=>{this.questions=this.questions.concat(data)
                    console.log(data)})
                  }})
  }

  loadQuestions(subjectid?:number): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:8089/api/getquestionsBySubjectId/${subjectid}/${this.code}`);
  }

  showQuestion(questionId: number): void {
    this.questions.forEach((question)=>{
                            if(question.id==questionId){
                              this.currentQuestion=question;
                            }
    })

  }
  sendoption(qid:number,option1:string)
  {
    this.selectedOptions[qid] = option1;
    console.log(option1)
  this.answer = {
    user: {
      id: this.uid
    },
    exam: {
      id: this.eid
    },
    question: {
      id: qid
    },
     userAnswer:option1,
  };

console.log(this.answer.user?.id+"uid")
console.log(this.answer.exam?.id+"eid")
console.log(this.answer.question?.id+"qid")
console.log(this.answer.userAnswer)


    console.log("+++++++++++++++++++++++++")
   console.log(this.answer.userAnswer);
       this.http.post(`http://localhost:8089/api/saveanswer`,this.answer).subscribe(data=>console.log(data));

  }
  isOptionSelected(questionId: number, option: string): boolean {
    return this.selectedOptions[questionId] === option;
  }

}
