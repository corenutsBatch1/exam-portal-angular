import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import { MyserviceService } from 'src/app/model/myservice';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  exam:ScheduleExam=new ScheduleExam();
  exam1:ScheduleExam[]=[];
  constructor(private route:Router,private http:HttpClient,private service:MyserviceService) { }

  ngOnInit() {
  }

  clickEvent(exam: any) {
    this.http.get(`http://localhost:8089/api/getallexams`).subscribe(
      data => {
        console.log(data);
        this.exam1 = this.exam1.concat(data);
        console.log(this.exam1);
        const uniqueExamNames = this.getUniqueExamNames(this.exam1);
        console.log(uniqueExamNames+"5555");
        console.log(this.exam.code)
        const examObject = uniqueExamNames.find(item => item.code === this.exam.code);
        console.log(examObject+"6666");
        if (examObject !== undefined) {
          console.log(examObject.id+"senddddddddddddddd")
          this.service.examid(examObject.id)
         // console.log(`Exam code and id present: ${examObject.code} - ${examObject.id}`);
          this.route.navigate(['exam', examObject.code]);
        }
      }
    );
  }

  getUniqueExamNames(exam: ScheduleExam[]): any[] {
    const uniqueExamNames = exam
      .filter((exam) => exam.code !== undefined && exam.id !== undefined)
      .map((exam) => ({id: exam.id, code: exam.code}));
    return [...new Set(uniqueExamNames.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
  }
}
