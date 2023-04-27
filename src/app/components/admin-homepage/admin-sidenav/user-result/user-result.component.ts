import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
// import { Marks } from 'src/app/model/model/Marks';
import { Marks } from 'src/app/model/model/Marks';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels';


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
export class UserResultComponent {

  marks:Marks[]=[];
  examcode1?:string;
  above80:number=0;
  above60:number=0;
  above35:number=0;
  fail:number=0;
  userMarks?:Marks[]=[];
  username?:string;
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
 exampiechart(code?:string){

  console.log(this.marks)
  this.marks.forEach(a=>{


      if(a.exam && a.exam.code==code) {
        this.userMarks?.push(a);      }

  })
  console.log(this.userMarks)
  if(this.userMarks){
    this.userMarks.forEach(a=>{
      if(a.marks != null && a.totalMarks != null)
      {
        if(a.totalMarks === 0 || (a.marks/a.totalMarks) === 0) {
          this.fail++;
        } else if((a.marks/a.totalMarks)>0.8) {
          this.above80++;
        } else if((a.marks/a.totalMarks)>0.6) {
          this.above60++;
        } else if((a.marks/a.totalMarks)>0.35) {
          this.above35++;
        } else {
          this.fail++;
        }
      }

    })

    this.RenderDailyChart();
    this.RenderDailyChart2();

  }
 }

//  exampiechart2(name?:string){

//   console.log(this.marks)
//   this.marks.forEach(a=>{

//     this.marks.forEach(a=>{
//       if(a.exam && a.exam.code==code) {
//         this.userMarks?.push(a);      }
//     });
//   })
//   console.log(this.userMarks)
//   if(this.userMarks){
//     this.userMarks.forEach(a=>{
//       if(a.marks != null && a.totalMarks != null)
//       {
//         if(a.totalMarks === 0 || (a.marks/a.totalMarks) === 0) {
//           this.fail++;
//         } else if((a.marks/a.totalMarks)>0.8) {
//           this.above80++;
//         } else if((a.marks/a.totalMarks)>0.6) {
//           this.above60++;
//         } else if((a.marks/a.totalMarks)>0.35) {
//           this.above35++;
//         } else {
//           this.fail++;
//         }
//       }

//     })

//     this.RenderDailyChart();
//   }
//  }

  RenderDailyChart() {
    new Chart("abc", {
      type: 'pie',
      data: {
        labels: ['above80', 'above60','above35','fail'],
        datasets: [{
          label: 'Day Report',
          data: [this.above80, this.above60,this.above35,this.fail], // converted string values to numbers
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  RenderDailyChart2() {
    new Chart("def", {
      type: 'bar',
      data: {
        labels: ['> 80% '+this.above80, '> 60% '+this.above60,'> 35% '+this.above35,'fail '+this.fail],
        datasets: [{
          label: 'Day Report',
          data: [this.above80, this.above60,this.above35,this.fail], // converted string values to numbers
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
