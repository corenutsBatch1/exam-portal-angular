
import { HttpClient } from '@angular/common/http';
import { ScheduleExam } from './../../../../model/model/ScheduleExam';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
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

  fetchExam(){
    this.http.get<ScheduleExam[]>(`http://54.64.6.102:9033/api/getallexams`).subscribe(data=>{
    this.exams=data;
    this.dataSource.data=this.exams
    this.dataSource.paginator = this.paginator;
  });
  }

  ngOnInit() {

   this.fetchExam();
  }

  loadAddExampage(flag:boolean){

    this.addexam=flag;
    this.fetchExam();
  }


  deleteexam(id:any){
       return this.http.delete(`http://54.64.6.102:9033/api/deleteExam/${id}`);

  }
  delete(id:any){

    Swal.fire({
      title: "Are you sure you want to Delete? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.deleteexam(id).subscribe(
      reponse=>{
        console.log(reponse);
        Swal.fire("Deleted successfully", '', "success");
        console.log(id);

        this.ngOnInit();
      }
      );
      } else {
      }
       });

    }

}
