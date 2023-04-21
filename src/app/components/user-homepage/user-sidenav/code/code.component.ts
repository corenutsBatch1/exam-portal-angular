import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  exam:ScheduleExam=new ScheduleExam();
  exam1:ScheduleExam[]=[];
  constructor(private route:Router,private http:HttpClient) { }

  ngOnInit() {
  }

  clickEvent(code: any) {
    this.http.get(`http://localhost:8089/api/getallexams`).subscribe(
      data => {
        console.log(data);
        console.log(this.exam.code)
        this.exam1 = this.exam1.concat(data);
        console.log(this.exam1)
        const uniquexamcodes = this.getUniqueexamNames(this.exam1);
        if (this.exam.code !== undefined) {
          console.log(uniquexamcodes);
          const codePresent = uniquexamcodes.includes(this.exam.code);
          console.log(`Exam code present: ${codePresent}`);
          if (codePresent == true) {
            this.route.navigate(['exam', this.exam.code]);
          }
        }
      })
  }



  getUniqueexamNames(exam: ScheduleExam[]): string[] {
    const uniqueexamNames = exam
      .map((exam) => exam?.code)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueexamNames)];


  }
}
