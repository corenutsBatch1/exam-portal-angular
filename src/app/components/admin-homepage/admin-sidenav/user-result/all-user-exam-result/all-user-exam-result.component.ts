import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import 'chartjs-plugin-datalabels';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

export interface PeriodicElement {
  serialNumber: number;
  examCode: string;
  name: string;
  totalMarks: number;
  obtainedMarks :number;

}


@Component({
  selector: 'app-all-user-exam-result',
  templateUrl: './all-user-exam-result.component.html',
  styleUrls: ['./all-user-exam-result.component.css']
})
export class AllUserExamResultComponent {

  @Output("loadAllUserExamResult") loadAllUserExamResult = new EventEmitter();


  goBack() {
    this.loadAllUserExamResult.emit(true);
  }


  allUserExamResult=true;
  showPieChart: boolean = false;
  marks:Marks[]=[];
  examcode1?:string;
  above80:number=0;
  above60:number=0;
  above35:number=0;
  fail:number=0;
  userMarks?:Marks[]=[];
  username?:string;
  username2?:string;
  examchart?:boolean;
  userchart?:boolean;
  userexamresult?:false;
  username3?:string;
  examname?:string;
  totalmarks?:number;
  gotmarks?:number;
  chart1: any;
  chart2: any;
  examchart1:any
  examchart2:any;
  nameFilterValue = '';
  codeFilterValue = '';
  ueseexammarks?:number[]=[];
  examcode:string[]=[]
  totalmarksarray:any[]=[]
  showExamCodeInput:boolean = true;
  dataSource = new MatTableDataSource<Marks>([]);
  uniqueexamcodes:any[]=[];
  filteredCodes: string[]=[];
  codeControl =new FormControl();
  nameControl =new FormControl();
  uniqueusernames:any[]=[];
  filterednames:string[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private titleService: Title,private http:HttpClient) {
    this.filteredCodes = this.uniqueexamcodes;
    this.codeControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCodes(value))
    ).subscribe(filteredCodes => {
      this.filteredCodes = filteredCodes;
    });
    console.log(this.filterednames)
    console.log(this.uniqueusernames)
    this.filterednames = this.uniqueusernames;
    this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filternames(value))
    ).subscribe(filteredCodes => {
      this.filterednames = filteredCodes;
    });
  }
  filterCodes(value: any): any {
    const filterValue = value.toLowerCase();
    return this.uniqueexamcodes.filter(code => code.toLowerCase().includes(filterValue));
  }
  filternames(value: any): any {
    const filterValue = value.toLowerCase();

    return this.uniqueusernames.filter(code => code.toLowerCase().includes(filterValue));
  }



  toggleInput(){
    this.showExamCodeInput = !this.showExamCodeInput;
  }
  ngOnInit(): void {
    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                    this.dataSource.paginator = this.paginator;
                                    this.marks.forEach(a=>this.uniqueexamcodes.push(a.exam?.code))
                                    this.uniqueexamcodes=[...new Set(this.uniqueexamcodes)]
                                    this.filteredCodes = this.uniqueexamcodes;
                                    this.marks.forEach(a=>this.uniqueusernames.push(a.user?.name))
                                    this.uniqueusernames=[...new Set(this.uniqueusernames)]
                                    this.filterednames = this.uniqueusernames;
                                })
  }

  displayedColumns: string[] = ['serialNumber', 'examCode', 'name', 'totalMarks', 'obtainedMarks'];

 //rounting
 loadAllUserResult(flag:boolean){
  this.allUserExamResult=flag;
 }
//For Searching
  applyFilter(): void {
    const nameFilterValue = this.nameFilterValue.trim().toLowerCase();
    console.log(this.nameFilterValue)

    this.dataSource.filterPredicate = (data: Marks, filter: string) => {
      const nameMatch = data.user?.name?.trim().toLowerCase().includes(nameFilterValue);
      const codeMatch = data.exam?.code?.trim().toLowerCase().includes(nameFilterValue );
      const marksMatch = data.marks === parseInt(nameFilterValue);
      const totalmarksMatch = data.totalMarks === parseInt(nameFilterValue);
      const idMatch = data.id === parseInt(nameFilterValue);
      return !!(nameMatch || codeMatch ||  marksMatch || totalmarksMatch || idMatch);
    };

    const filterValue = `${nameFilterValue}`;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)
  }



  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://54.64.6.102:9033/api/getmarks`)
  }

 exampiechart(code?:string){
  this.userchart=false;
  this.examchart=true
  this.userMarks?.splice(0, this.userMarks.length);
  this.above80 = 0; // reset variables to zero
  this.above60 = 0;
  this.above35 = 0;
  this.fail = 0;

  this.marks.forEach(a=>{
      if(a.exam && a.exam.code==this.codeControl.value) {
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


  userpiechart(name:any){
    this.examcode?.splice(0, this.examcode.length);
    this.ueseexammarks?.splice(0, this.ueseexammarks.length);

    this.userchart=true;
    this.examchart=false;
    console.log(name)
    this.marks.forEach(a=>{
        if(a.marks && a.user?.name==this.nameControl.value && a?.exam?.code ) {
          console.log(a)
          this.examcode.push(a.exam.code);
          this.totalmarksarray.push(a.totalMarks)
           this.ueseexammarks?.push(a.marks)
           console.log(this.examcode)
           console.log(this.ueseexammarks)

            }
    })
    console.log(this.examcode)
    console.log(this.ueseexammarks)
    if(this.examcode)
    {
      console.log("calling render")
    this.RenderDailyChart();
    this.RenderDailyChart2();

    }

  }
  examresult(name?:string,code?:string)
{

  this.marks.forEach(a=>{
    if(a.exam && a.exam.code==code &&  a.user?.name==this.nameControl.value) {
          this.username3=a.user?.name;
          this.examname=a.exam.name;
          this.totalmarks=a.totalMarks;
          this.gotmarks=a.marks;
        }
})


}

  RenderDailyChart() {
    if (this.chart1) {
      this.chart1.destroy();
    }
    if (this.examchart1) {
      this.examchart1.destroy();
    }

    if (this.examchart) {
      // Create exam chart
      console.log("exampiechat123")
      this.chart1 = new Chart("abc", {
        type: 'pie',
        data: {
          labels: ['above80', 'above60', 'above35', 'fail'],
          datasets: [{
            label: 'Exam Report',
            data: [this.above80, this.above60, this.above35, this.fail],
            backgroundColor: [
              'green',
              'blue',
              'aqua',
              'red'
            ],
            borderWidth:0
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
    } else {let labels = [];
      let data = [0, 0, 0, 0];
      let totalmarks =this.totalmarksarray; // example total marks array

      // Iterate over exam codes and marks to populate labels and data
      for (let i = 0; i < this.examcode.length; i++) {
        if (this.ueseexammarks) {
          let code = this.examcode[i];
          let marks = this.ueseexammarks[i];
          data[i] = marks;
          labels.push(`${code}:${marks} out of ${totalmarks[i]}`);
        }
      }

      // Create user chart
      this.examchart1 = new Chart("abc", {
        type: 'pie',
        data: {
          labels: labels, // use dynamically generated labels
          datasets: [{
            label: '',
            data: data, // use dynamically generated data
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

  RenderDailyChart2() {
    if (this.chart2) {
      this.chart2.destroy();
    }
    if (this.examchart2) {
      this.examchart2.destroy();
    }

    if (this.examchart) {
      // Create exam chart
      console.log("exambar")
      this.chart2 = new Chart("def", {
        type: 'bar',
        data: {
          labels: ['>80% :'+this.above80, '>60% : '+this.above60,'>35% : '+this.above35,'fail : '+this.fail],

          datasets: [{
            label: 'Exam Report',
            data: [this.above80, this.above60, this.above35, this.fail], // converted string values to numbers
            backgroundColor: [
              this.above80 > 0 ? 'green' : 'red',
              this.above60 > 0 ? 'blue' : 'red',
              this.above35 > 0 ? 'aqua' : 'red',
              this.fail > 0 ? 'red' : 'green'
            ],
            borderWidth: 0
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
    } else {
      console.log("userexambar")
      // Initialize empty arrays for labels and data
      let labels = [];
      let data = [0, 0, 0, 0];
      let totalmarks =this.totalmarksarray; // example total marks array
      // Iterate over exam codes and marks to populate labels and data
      for (let i = 0; i < this.examcode.length; i++) {
        if (this.ueseexammarks) {
          let code = this.examcode[i];
          let marks = this.ueseexammarks[i];
          data[i]=marks;
          labels.push(`${code}: ${marks} out of ${totalmarks[i]}`);
        }
      }

      // Create user chart
      this.examchart2 = new Chart("def", {
        type: 'bar',
        data: {
          labels: labels, // use dynamically generated labels
          datasets: [{
            label: 'Exam Report',
            data: data, // use dynamically generated data

            borderWidth: 0
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


}
