import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/model/model/Exam';

@Component({
  selector: 'app-createPaper',
  templateUrl: './createPaper.component.html',
  styleUrls: ['./createPaper.component.css']
})
export class CreatePaperComponent implements OnInit {

  exam:Exam=new Exam();
  exams:Exam[]=[];
  addpaper:boolean=true;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  this.fetchExam();
  }
  loadAddPaperpage(flag:boolean){

    this.addpaper=flag;
  }

  fetchExam(){
    this.http.get<Exam[]>(`http://localhost:8088/api/getallExams`).subscribe(data=>{

    console.log(data)
    this.exams=data;
  });
  }

}
