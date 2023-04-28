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
import { MatButtonToggleModule } from '@angular/material/button-toggle';




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
  showPieChart: boolean = false;
  marks:Marks[]=[];
  examcode1?:string;
  above80:number=0;
  above60:number=0;
  above35:number=0;
  fail:number=0;
  userMarks?:Marks[]=[];
  username?:string;
  chart1: any;
chart2: any;
nameFilterValue = '';
  codeFilterValue = '';
   constructor(private http:HttpClient){}

  ngOnInit(): void {


    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                })

  }

  displayedColumns: string[] = ['serialNumber', 'examCode', 'name', 'totalMarks', 'obtainedMarks'];
  dataSource = new MatTableDataSource<Marks>([]);

  applyFilter(): void {
    const nameFilterValue = this.nameFilterValue.trim().toLowerCase();
    const codeFilterValue = this.codeFilterValue.trim().toLowerCase();
    console.log(this.nameFilterValue)
    console.log(this.codeFilterValue)

    this.dataSource.filterPredicate = (data: Marks, filter: string) => {
      const nameMatch = data.user?.name?.trim().toLowerCase().includes(nameFilterValue);
      const codeMatch = data.exam?.code?.trim().toLowerCase().includes(nameFilterValue );
      const marksMatch = data.marks === parseInt(nameFilterValue);
      const totalmarksMatch = data.totalMarks === parseInt(nameFilterValue);
      const idMatch = data.id === parseInt(nameFilterValue);
      return !!(nameMatch || codeMatch ||  marksMatch || totalmarksMatch || idMatch);
    };

    const filterValue = `${nameFilterValue} ${codeFilterValue}`;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)
  }
  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://localhost:8089/api/getmarks`)
  }


 exampiechart(code?:string){
  this.userMarks?.splice(0, this.userMarks.length);
  this.above80 = 0; // reset variables to zero
  this.above60 = 0;
  this.above35 = 0;
  this.fail = 0;
  this.marks.forEach(a=>{
      if(a.exam && a.exam.code==code) {
        this.userMarks?.push(a);
        console.log("exampiexhart")
        console.log(this.userMarks)
          }
  })

  if(this.userMarks){
    this.userMarks.forEach(a=>{
      if(a.marks != null && a.totalMarks != null)
      {
         if((a.marks/a.totalMarks)>0.8) {
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


  RenderDailyChart() {
    if (this.chart1) {
      this.chart1.destroy();

    }
    this.chart1 = new Chart("abc", {
      type: 'pie',
      data: {
        labels: ['above80', 'above60','above35','fail'],
        datasets: [{
          label: 'Exam Report',
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
    if (this.chart2) {
      this.chart2.destroy();
    }
    this.chart2=new Chart("def", {
      type: 'bar',
      data: {
        labels: ['>80% :'+this.above80, '>60% : '+this.above60,'>35% : '+this.above35,'fail : '+this.fail],
        datasets: [{
          label: 'Exam Report',
          data: [this.above80, this.above60,this.above35,this.fail], // converted string values to numbers
          borderWidth:9.2
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
function includes(nameFilterValue: string) {
  throw new Error('Function not implemented.');
}

