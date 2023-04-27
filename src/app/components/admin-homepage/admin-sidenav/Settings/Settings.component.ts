import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/model/model/Subject';


@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css'],
})
export class SettingsComponent implements OnInit {
  show: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'description', 'Action'];
  dataSource:Subject[]=[];
  subject:Subject=new Subject();
  subjectId?:number;
  constructor(private route: Router,private http:HttpClient) {}

  ngOnInit() {

    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe(data=>{
      console.log(data);
      this.dataSource=data;
      console.log(this.dataSource);
  });
}
  loadAddSubjectPage(flag:boolean) {
    this.show = flag;
    this.route.navigate(['adminpage/settings/addsubject'], { queryParams: { action: 'add' } });
  }
  loadEditSubjectPage(flag:boolean,id?:any) {
   this.subjectId=id;
    this.show = flag;
    this.route.navigate(['adminpage/settings/addsubject'], { queryParams: { action: 'edit' } });

  }

}
