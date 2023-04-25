import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/model/Question';
import { useranswer } from 'src/app/model/model/useranswer';
import { MyserviceService } from 'src/app/model/myservice';

@Component({
  selector: 'app-userAnswers',
  templateUrl: './userAnswers.component.html',
  styleUrls: ['./userAnswers.component.css']
})
export class UserAnswersComponent implements OnInit {
  code?: any;
  uid:any;
  eid:any;
  questions:Question[]=[];
  score?:Number;
  userAnswers: useranswer[]=[];

  constructor(private http: HttpClient,private route:ActivatedRoute,private service:MyserviceService
    ) { }

  ngOnInit() {
    this.uid=this.service.sendid();
    this.eid=this.service.sendeid();
    console.log(this.uid,this.eid)
    this.route.params.subscribe(params => {
      this.code = params['code'];
      console.log('Exam code:', this.code);
      this.loadQuestions().subscribe(data=>{
          this.questions=data;
        console.log(this.questions)})

  })
  this.loadScore().subscribe(arg => this.score = arg);
  this.loadUserAnswers().subscribe((data)=>this.userAnswers=data)

}
  loadQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:8089/api/getquestionsBySubjectId/${this.code}`);
  }

  loadScore(): Observable<Number>{
    return this.http.get<Number>(`http://localhost:8090/api/getScore/${this.uid}/${this.eid}`);
  }

  loadUserAnswers(): Observable<useranswer[]>{
    return this.http.get<useranswer[]>(`http://localhost:8089/api/getUserAnswers/${this.uid}/${this.eid}`);
  }
}
