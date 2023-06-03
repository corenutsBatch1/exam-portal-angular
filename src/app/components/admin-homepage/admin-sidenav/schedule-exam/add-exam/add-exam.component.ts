import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { response } from 'express';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit{
  @Output('loadAddExampage') loadAddExampage = new EventEmitter();
  constructor(private http :HttpClient) { }
  scheduleExam=new ScheduleExam();
  papers: CreatePaper[] = [];
  paperId?: number;
  selected = null;
  subjectControl = new FormControl();
  exams:ScheduleExam[]=[];
  start?:any;
  end?:any;

  ngOnInit(): void {
    this.http.get<CreatePaper[]>(`http://54.64.6.102:9033/api/getpaper`).subscribe(data=>{
       this.papers=data;
    })
   }

  addpaper(paperId?:number)
  {
    this.paperId=paperId;
  }

  addexam(scheduleExam:ScheduleExam)
  {

    if (typeof scheduleExam.startTime === 'string' && typeof scheduleExam.endTime === 'string') {
     this.start = new Date(scheduleExam.startTime);
     this.end = new Date(scheduleExam.endTime);
    }
     if(scheduleExam.name==undefined || scheduleExam.code==undefined || scheduleExam.startTime==undefined || scheduleExam.endTime==undefined || scheduleExam.examDuration==undefined || this.paperId==undefined )
     {
      Swal.fire("All field must be required","", "error");
     }
     else if(Number(scheduleExam.examDuration) < 0){
      Swal.fire("ExamDuration must be positive number","", "error");
     }
     else{
      if(this.start>this.end) {
        Swal.fire("strat time  must be less than end time","", "error");
      }
       else{
        this.http.post<ScheduleExam>(`http://54.64.6.102:9033/api/addexam/${this.paperId}`,scheduleExam).subscribe(
    response=>{
      Swal.fire("Exam scheduled successfully","", "success");
      this.goBack();
    },
    error=>{
      Swal.fire("All field must be required","", "error");
    }
  );
       }
    }
  }

  onCheckboxChange(event: MatCheckboxChange): void {
    this.scheduleExam.showResults = event.checked
  }

  goBack() {
      this.loadAddExampage.emit(true);
     }

}



