import { HttpClient } from '@angular/common/http';
import { ScheduleExam } from './../../../../model/model/ScheduleExam';
import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent {

  scheduleExam:ScheduleExam=new ScheduleExam();
  exams:ScheduleExam[]=[];
  addexam:boolean=true;
  constructor(private http:HttpClient) { }

  ngOnInit() {
   this.fetchExam();
  }
  loadAddExampage(flag:boolean){

    this.addexam=flag;
  }

  fetchExam(){
    this.http.get<ScheduleExam[]>(`http://localhost:8089/api/getallexams`).subscribe(data=>{

    console.log(data)
    this.exams=data;
  });
  }

}