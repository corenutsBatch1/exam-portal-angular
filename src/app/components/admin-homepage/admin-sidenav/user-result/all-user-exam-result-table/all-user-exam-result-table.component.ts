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
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

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
  styleUrls: ['./all-user-exam-result-table.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AllUserExamResultTableComponent {

  @Output("loadAllUserExamResultTable")  loadAllUserExamResultTable=new EventEmitter();
  Exams?: ScheduleExam[];
  examnames: any;
  selectedexam?:any;

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
  isHidden:boolean=false;

  dataSource = new MatTableDataSource<Marks>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http:HttpClient) {
  }


  ngOnInit(): void {
    // this.getMarks().subscribe((data)=>{this.marks=data
    //                                 this.dataSource.data=this.marks
    //                                 this.dataSource.paginator = this.paginator;
    //                             })
 
  }

  getMarks():Observable<Marks[]>{
    return this.http.get<Marks[]>(`http://54.64.6.102:9033/api/getmarks`)
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
                'S.No',
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



  byExamId(){
    this.http.get<Marks[]>(`http://54.64.6.102:9033/api/marks/1`).subscribe((data)=>{
      console.warn(data)
    })
  }
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment, dp: any) {
    this.isHidden=true
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    dp.close();
    console.warn(normalizedYear.year())
    console.log(this.date.value, ctrlValue);
    this.http.get<ScheduleExam[]>(`http://54.64.6.102:9033/api/getexamsbyyear/${normalizedYear.year()}`)
    .subscribe((data: ScheduleExam[]) => {
      this.Exams = data;
      console.warn(this.Exams+'exams')
      if(this.Exams.length==0){
        this.dataSource.data=[];
      }
      this.Exams.forEach(e => {
        const examName = (e.code?.toString() || '') + (e.name?.toString() || '');
        this.examnames.push(examName);
      });
    });
  }
  onExamSelection(){

    console.log(this.selectedexam);
    return this.http.get<Marks[]>(`http://54.64.6.102:9033/api/marks/${this.selectedexam}`).subscribe((data)=>{this.marks=data
    this.dataSource.data = this.marks.sort((a, b) => {
      if (a.marks === undefined && b.marks === undefined) {
        return 0;
      }
      if (a.marks === undefined) {
        return 1;
      }
      if (b.marks === undefined) {
        return -1;
      }
      return b.marks - a.marks;
    });
  
    this.dataSource.paginator = this.paginator;
  })
  
   }



}
