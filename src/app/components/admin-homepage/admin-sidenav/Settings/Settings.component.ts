import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/app/model/model/Subject';
import swal from 'sweetalert';
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
    swal({
      title: "Are you sure you want to Delete? ",
      icon: "warning",
      buttons: ['Cancel', 'Yes, Delete'],
      dangerMode: true,
    })
    .then((deleteConfirmed: any) => {
      if (deleteConfirmed) {
        this.deleteSubject(id).subscribe(
      reponse=>{
        swal("Deleted successfully", '', "success");
        console.log(reponse);
        console.log(id);
        this.ngOnInit();
      }
      );
      } else {
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

