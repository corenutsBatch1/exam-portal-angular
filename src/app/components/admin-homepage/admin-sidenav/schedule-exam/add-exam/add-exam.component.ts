import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { response } from 'express';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import swal from 'sweetalert';

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

    this.http.get<CreatePaper[]>(`http://localhost:8089/api/getpaper`).subscribe(data=>{
      console.log(data);
       this.papers=data;
       console.log(this.papers);
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
      console.log(this.start);
      console.log(this.end);
      // Rest of your code here
    } else {
      // Handle the error or do nothing
    }
     if(scheduleExam.name==undefined || scheduleExam.code==undefined || scheduleExam.startTime==undefined || scheduleExam.endTime==undefined || scheduleExam.examDuration==undefined || this.paperId==undefined )
     {

      swal("All field must be required","", "error");
     }
     else{

      if(this.start>this.end) {
        swal("strat time  must be less than end time","", "error");

      }
       else{
        this.http.post<ScheduleExam>(`http://localhost:8089/api/addexam/${this.paperId}`,scheduleExam).subscribe(

    response=>{
      swal("Exam scheduled successfully","", "success");
      this.goBack();
    },
    error=>{
      //console.error('Error:', error.message);
      //console.log('Error details:', JSON.stringify(error));
     swal("All field must be required","", "error");
    }
  );
       }
    }
  }
  goBack() {
    console.log("go back")
      this.loadAddExampage.emit(true);
     }

}



