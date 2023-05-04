import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Title } from '@angular/platform-browser';




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

  dataSource = new MatTableDataSource<Marks>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private titleService: Title,private http:HttpClient) {
  }


  ngOnInit(): void {
    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                    this.dataSource.paginator = this.paginator;
                                })
  }

  displayedColumns: string[] = ['serialNumber', 'examCode', 'name', 'totalMarks', 'obtainedMarks'];


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



  generatePDF(): void {
    var i=1;
    const filteredData = this.dataSource.filteredData;
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'User Exam Result Data',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                'Serial Number',
                'Exam Code',
                'User Name',
                'Total Marks',
                'Obtained Marks'
              ],
              ...filteredData.map(d => [
                i++ || "",
                d.exam?.code || "",
                d.user?.name || "",
                d.totalMarks || 0,
                d.marks || 0

              ])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }

  generatePDF2(): void {
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'User Exam Result Data', style: 'header' },
        `Name: ${this.username3 || ""}\n`,
        `Exam Name: ${this.examname || ""}\n`,
        `Total Marks: ${this.totalmarks || 0}\n`,
        `Obtained Marks: ${this.gotmarks || 0}`
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://localhost:8089/api/getmarks`)
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
  userpiechart(name:any){
    this.examcode?.splice(0, this.examcode.length);
    this.ueseexammarks?.splice(0, this.ueseexammarks.length);

    this.userchart=true;
    this.examchart=false;
    console.log(name)
    this.marks.forEach(a=>{
        if(a.marks && a.user?.name==name && a?.exam?.code ) {
          console.log(a)
          this.examcode.push(a.exam.code);
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
    if(a.exam && a.exam.code==code &&  a.user?.name==name) {
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
            data: [this.above80, this.above60, this.above35, this.fail], // converted string values to numbers
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
    } else {
      console.log("userexampiechart")
      // Initialize empty arrays for labels and data
      let labels = [];
      let data = [0, 0, 0, 0];

      // Iterate over exam codes and marks to populate labels and data
      for (let i = 0; i < this.examcode.length; i++) {
        if (this.ueseexammarks) {
          let code = this.examcode[i];
          let marks = this.ueseexammarks[i];
          data[i]=marks;
          labels.push(code);
        }
      }

      // Create user chart
      this.examchart1 = new Chart("abc", {
        type: 'pie',
        data: {
          labels: labels, // use dynamically generated labels
          datasets: [{
            label: 'Exam Report',
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
    } else {
      console.log("userexambar")
      // Initialize empty arrays for labels and data
      let labels = [];
      let data = [0, 0, 0, 0];

      // Iterate over exam codes and marks to populate labels and data
      for (let i = 0; i < this.examcode.length; i++) {
        if (this.ueseexammarks) {
          let code = this.examcode[i];
          let marks = this.ueseexammarks[i];
          data[i]=marks;
          labels.push(code);
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


  // public openPDF(): void {
  //   const TABLE: any = document.querySelector('#my-table');

  //   html2canvas(TABLE).then((canvas) => {
  //     const fileWidth = 208;
  //     const fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     const PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     const currentDate=new Date();
  //     PDF.save('Exam-result '+currentDate+'.pdf');
  //   });
  // }
  // public openPDF2(): void {
  //   const userexamresult: any = document.querySelector('#result');

  //   html2canvas(userexamresult).then((canvas) => {
  //     const fileWidth = 208;
  //     const fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     const PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('userexamresult-demo.pdf');
  //   });
  // }


}

function includes(nameFilterValue: string) {
  throw new Error('Function not implemented.');
}

