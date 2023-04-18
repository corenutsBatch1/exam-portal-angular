import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreatePaper } from 'src/app/model/model/CreatePaper';

@Component({
  selector: 'app-createPaper',
  templateUrl: './createPaper.component.html',
  styleUrls: ['./createPaper.component.css']
})
export class CreatePaperComponent implements OnInit {

  createPaper:CreatePaper=new CreatePaper();
  papers:CreatePaper[]=[];
  addpaper:boolean=true;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  this.fetchPaper();
  }
  loadAddPaperpage(flag:boolean){

    this.addpaper=flag;
  }

  fetchPaper(){
    this.http.get<CreatePaper[]>(`http://localhost:8089/api/getpaper`).subscribe(data=>{

    console.log(data)
    this.papers=data;
  });
  }

}
