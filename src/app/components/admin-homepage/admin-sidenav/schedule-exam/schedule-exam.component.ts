import { HttpClient } from '@angular/common/http';
import { ScheduleExam } from './../../../../model/model/ScheduleExam';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit {

  scheduleExam:ScheduleExam=new ScheduleExam();
  exams:ScheduleExam[]=[];
  addexam:boolean=true;
  dataSource = new MatTableDataSource<ScheduleExam>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private http:HttpClient) { }

  ngOnInit() {

   this.fetchExam();
  }
  loadAddExampage(flag:boolean){

    this.addexam=flag;
  }

  fetchExam(){
    this.http.get<ScheduleExam[]>(`http://localhost:8089/api/getallexams`).subscribe(data=>{
    this.exams=data;
    this.dataSource.data=this.exams
    this.dataSource.paginator = this.paginator;
  });
  }

  deleteexam(id:any){
        this.http.delete(`http://localhost:8089/api/deleteExam/${id}`).subscribe(data=>{


        //   console.log(data);
        //   this.ngOnInit();
         })
  }
  // delete(id:any,id2:any){

  //   swal({
  //     title: "Are you sure you want to Delete? ",
  //     icon: "warning",
  //     buttons: ['Cancel', 'Yes, Delete'],
  //     dangerMode: true,
  //   })
  //   .then((deleteConfirmed: any) => {
  //     if (deleteConfirmed) {
  //       this.deleteexam(id,id2).subscribe(
  //     reponse=>{
  //       console.log(reponse);
  //       swal("Deleted successfully", '', "success");
  //       console.log(id);
  //       console.log(id2);
  //       this.ngOnInit();
  //     }
  //     );
  //     } else {
  //     }
  //      });

  //   }

}
