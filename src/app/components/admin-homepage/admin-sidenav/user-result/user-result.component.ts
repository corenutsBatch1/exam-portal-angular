import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';



export interface PeriodicElement {
  serialNumber: number;
  examCode: string;
  name: string;
  totalMarks: number;
  obtainedMarks :number;
}

//hard coded data for checking
// const ELEMENT_DATA: PeriodicElement[] = [
//   {serialNumber: 1, examCode: 'java_01',name:'fahad', totalMarks:40, obtainedMarks:33},
//   {serialNumber: 2, examCode: 'java_01', name:'suresh', totalMarks:40, obtainedMarks:34},
//   {serialNumber: 3, examCode: 'java_01',name:'karthik',  totalMarks:40, obtainedMarks:36},
//   {serialNumber: 4, examCode: 'java_01',name:'gunesh',  totalMarks:40, obtainedMarks: 37},
//   {serialNumber: 5, examCode: 'java_01',name:'thirumalesh',  totalMarks:40, obtainedMarks:24},
//   {serialNumber: 6, examCode: 'java_02',name:'thirumalesh',  totalMarks:40, obtainedMarks:27},
//   {serialNumber: 7, examCode: 'java_02',name:'karthik',  totalMarks:40, obtainedMarks:29},
//   {serialNumber: 8, examCode: 'java_02',name:'suresh',  totalMarks:40, obtainedMarks:32},
//   {serialNumber: 9, examCode: 'java_02',name:'fahad',  totalMarks:40, obtainedMarks:35},
//   {serialNumber: 10, examCode: 'java_02',name:'gunesh',  totalMarks:40, obtainedMarks:29},
// ];

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})
export class UserResultComponent implements OnInit{

  marks:Marks[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                })

  }

  displayedColumns: string[] = ['serialNumber','examCode', 'name', 'totalMarks', 'obtainedMarks'];
  dataSource = new MatTableDataSource<Marks>([]);




  applyFilter(event: Event) {
    console.log(this.dataSource+" datsource----------");
    console.log()
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://localhost:8089/api/getmarks`)
  }


}
