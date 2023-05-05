
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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions } from 'pdfmake/interfaces';


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
                                      console.log("in answers"+this.score);
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


  generatePDF() {
    const docDefinition: TDocumentDefinitions = {
      content: [
        {

          text: `Your Score is : ${this.score} / ${this.exam?.createPaper?.totalMarks}`,
          style: 'header'
        },
        {
          ol: this.questions.map((question, i) => {
            const listItems = [
              `${question.content}`
            ];

            if (question.subject?.name !== 'Coding') {
              listItems.push(`A) ${question.optionA}`);
              listItems.push(`B) ${question.optionB}`);
              listItems.push(`C) ${question.optionC}`);
              listItems.push(`D) ${question.optionD}`);

              const answer = this.userAnswers.find(answer => answer.question?.id === question.id);

              if (answer) {
                  listItems.push(`YourAnswer : ${answer.userAnswer}`);
              }

              listItems.push(`CorrectAnswer : ${question.answer}`);
              listItems.push('\n');

            }else{
              listItems.push('\n');
            }

            // Map each list item string to an ordered list item object with a `text` property
            return listItems.map(item => ({ text: item }));
          })
        }

      ],
      styles: {
        header: {
          alignment: 'center',
          fontSize: 20,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }





}
