import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';

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

  subjectControl = new FormControl();

  exams:ScheduleExam[]=[];
  ngOnInit(): void {

    this.http.get<CreatePaper[]>(`http://localhost:8089/api/getpaper`).subscribe(data=>{
      console.log(data);
       this.papers=data;
       console.log(this.papers);
       console.log("---------------")

    })
   }

  addpaper(paperId?:number)
  {
    this.paperId=paperId;
  }

  addexam(scheduleExam:ScheduleExam)
  {

    this.http.post<ScheduleExam>(`http://localhost:8089/api/addexam/${this.paperId}`,scheduleExam).subscribe(data=>{
    console.log(data);
    alert("submitted");
    this.goBack();

  });
  }
  goBack() {
    console.log("go back")
      this.loadAddExampage.emit(true);
     }

}



