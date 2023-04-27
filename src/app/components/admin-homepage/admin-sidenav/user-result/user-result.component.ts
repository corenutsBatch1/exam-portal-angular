
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
// import { Marks } from 'src/app/model/model/Marks';
import { Marks } from 'src/app/model/model/Marks';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';

export interface PeriodicElement {
  serialNumber: number;
  examCode: string;
  name: string;
  totalMarks: number;
  obtainedMarks :number;
}


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
