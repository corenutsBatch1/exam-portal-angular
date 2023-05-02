
import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';

import { Question } from 'src/app/model/model/Question';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import { useranswer } from 'src/app/model/model/useranswer';
import { MyserviceService } from 'src/app/model/myservice';
import * as jsPDF from 'jspdf';

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
  score?:number;
  userAnswers: useranswer[]=[];
  totalmarks?:number;
  obtainedMarks?:Marks;
  exam?:ScheduleExam;

  constructor(private http: HttpClient,private route:ActivatedRoute,private service:MyserviceService, private locationStrategy: LocationStrategy
    ) { }

  ngOnInit() {
    this.locationStrategy.onPopState(() => {
      history.forward();
    });

    this.uid=this.service.sendid();
    this.eid=this.service.sendeid();
    console.log("enter..."+this.uid,this.eid)
    this.route.params.subscribe(params => {
      this.code = params['code'];
      console.log('Exam code:', this.code);
      this.loadQuestions().subscribe(data=>{
                             this.questions=data;})
                      })

  this.loadScore().subscribe((data)=>{this.score=data;
                                      this.score=this.score+this.service.getcodingmarks();
                                        this.insertMarks()})
  this.loadUserAnswers().subscribe((data)=>this.userAnswers=data)

  this.loadExam().subscribe(data=>{this.exam=data})

}

  loadQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:8089/api/getquestionsBySubjectId/${this.code}`);
  }

  loadScore(): Observable<number>{
    return this.http.get<number>(`http://localhost:8090/api/getScore/${this.uid}/${this.eid}`);
  }

  loadUserAnswers(): Observable<useranswer[]>{
    return this.http.get<useranswer[]>(`http://localhost:8089/api/getUserAnswers/${this.uid}/${this.eid}`);
  }

  loadExam():Observable<ScheduleExam>{
    return this.http.get<ScheduleExam>(`http://localhost:8089/api/getexam/${this.eid}`)
  }
  saveScore(){
    this.http.post(`http://localhost:8089/api/savemarks`,this.obtainedMarks).subscribe((data)=>console.log(data+"saved"));
  }

  insertMarks(){
    console.log(this.exam)
    this.totalmarks=this.exam?.createPaper?.totalMarks;
    console.log(this.exam?.createPaper?.totalMarks+"+++")
    console.log(this.score)
    this.obtainedMarks={

      user:{
        id:this.uid
      },
      exam:{
        id:this.eid
      },
      totalMarks:this.exam?.createPaper?.totalMarks,
      marks:this.score,

    }
    this.saveScore()

  }


}
