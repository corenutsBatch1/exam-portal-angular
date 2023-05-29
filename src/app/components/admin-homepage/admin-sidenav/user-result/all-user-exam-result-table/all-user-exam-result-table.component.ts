import { HttpClient } from '@angular/common/http';
import { Component,ViewChild, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import 'chartjs-plugin-datalabels';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';


export interface PeriodicElement {
  serialNumber: number;
  examCode: string;
  name: string;
  totalMarks: number;
  obtainedMarks :number;
}


@Component({
  selector: 'app-all-user-exam-result-table',
  templateUrl: './all-user-exam-result-table.component.html',
  styleUrls: ['./all-user-exam-result-table.component.css']
})
export class AllUserExamResultTableComponent {

  @Output("loadAllUserExamResultTable")  loadAllUserExamResultTable=new EventEmitter();

  goBack(){
    this.loadAllUserExamResultTable.emit(true);
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

  dataSource = new MatTableDataSource<Marks>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http:HttpClient) {
  }


  ngOnInit(): void {
    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                    this.dataSource.paginator = this.paginator;
                                })
  }

  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://localhost:9033/api/getmarks`)
  }

  displayedColumns: string[] = ['serialNumber', 'examCode', 'name', 'totalMarks', 'obtainedMarks'];

 //rounting
 loadAllUserResult(flag:boolean){
  this.allUserExamResult=flag;
 }

//For Searching
  applyFilter(event: Event): void {
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
          text: 'Exam Result Data',
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



}
