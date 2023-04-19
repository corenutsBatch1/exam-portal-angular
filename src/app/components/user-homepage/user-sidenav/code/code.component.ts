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
  constructor(private route:Router) { }

  ngOnInit() {
  }

  clickEvent(){
this.route.navigate(['exam'])

  }

}
