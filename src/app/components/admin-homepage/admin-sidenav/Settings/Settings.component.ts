import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/model/model/Subject';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css'],
})
export class SettingsComponent implements OnInit {
  show: boolean = true;
  editShow: boolean=true;
  displayedColumns: string[] = ['id', 'name', 'description', 'edit','delete'];
  dataSource:Subject[]=[];
  subject:Subject=new Subject();
  subjectId?:number;
  datasource = new MatTableDataSource<Subject>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private route: Router,private http:HttpClient) {}

  fetchSubjects(){
    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe(data=>{
    console.log(data);
    this.dataSource=data;
    this.datasource.data=this.dataSource
    this.datasource.paginator = this.paginator;
    console.log(this.dataSource);
});
  // location.reload();
}

  ngOnInit(): void {
    this.fetchSubjects()
  }


  loadAddSubjectPage(flag:boolean) {
    this.subjectId=undefined
    this.show = flag;
    this.fetchSubjects()
    this.route.navigate(['adminpage/settings/addsubject'], { queryParams: { action: 'add' } });
  }
  loadEditSubjectPage(flag:boolean,id?:any) {
   this.subjectId=id;
    this.show = flag;
    this.fetchSubjects()
    this.route.navigate(['adminpage/settings/addsubject'], { queryParams: { action: 'edit' } });

  }
  deleteSubjectInfo(id?:number){
    Swal.fire({
      title: "Are you sure you want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.deleteSubject(id).subscribe(
          response => {
            Swal.fire("Deleted successfully", "", "success");
            console.log(response);
            console.log(id);
            this.ngOnInit();
          },
          error => {
            Swal.fire("Error", "An error occurred while deleting.", "error");
            console.log(error);
          }
        );
      } else {
        // Handle cancel or close action
      }
    });


  }
  deleteSubject(id?:number){
    console.log(id);
  return  this.http.delete(`http://localhost:8089/api/deleteSubject/${id}`);

}
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

