import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';



@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  code?: any;
  currentQuestion?: Question ;

  questions: Question[] = [];
  subjects: Subject[] =[];
  uniqueSubjectNames: String[] =[];

  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  ngOnInit(): void {
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
    this.subjects.forEach((subject)=>{
                  if(subject.name==subjectName){
                    this.loadQuestions(subject.id).subscribe((data)=>{this.questions=this.questions.concat(data)
                    console.log(data)})
                  }})
  }

  loadQuestions(subjectId?: number): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:8089/api/getallquestions/${subjectId}`);
  }

  showQuestion(questionId: number): void {
    this.questions.forEach((question)=>{
                            if(question.id==questionId){
                              this.currentQuestion=question;
                            }
    })

  }
}
