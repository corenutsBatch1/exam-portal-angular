import { HttpClient } from '@angular/common/http';
import { Component,ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import 'chartjs-plugin-datalabels';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';





@Component({
  selector: 'app-individual-user-result',
  templateUrl: './individual-user-result.component.html',
  styleUrls: ['./individual-user-result.component.css']
})
export class IndividualUserResultComponent {

  marks:Marks[]=[];
  nameFilterValue = '';
  activeButton: string = '';
  userName:string=''
  // id2:any;


  dataSource = new MatTableDataSource<Marks>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http:HttpClient,private route:ActivatedRoute) {
  }


  ngOnInit(): void {

    // this.route.parseUrl

    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                    this.dataSource.paginator = this.paginator;
                                })

  }

  getMarks(): Observable<Marks[]> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const id2 = params.get('id2');
        console.log("id result" + id2); // Use the retrieved value as needed
        return this.http.get<Marks[]>(`http://localhost:9033/api/getmarks/${id2}`);
      })
    );
  }


  displayedColumns: string[] = ['serialNumber', 'examCode','totalMarks', 'obtainedMarks'];



//For Searching
  applyFilter(event: Event): void {
    console.log("apply")
    console.log(this.marks)
    const nameFilterValue = this.nameFilterValue.trim().toLowerCase();
    console.log(this.nameFilterValue)

    this.dataSource.filterPredicate = (data: Marks) => {
      const codeMatch = data.exam?.code?.trim().toLowerCase().includes(nameFilterValue );
      const marksMatch = data.marks === parseInt(nameFilterValue);
      const totalmarksMatch = data.totalMarks === parseInt(nameFilterValue);
      return !!(codeMatch ||  marksMatch || totalmarksMatch);
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
            widths: ['auto','auto', 'auto', 'auto'],
            body: [
              [
                'Serial Number',
                'Exam Code',
                'Total Marks',
                'Obtained Marks'
              ],
              ...filteredData.map(d => [
                i++ || "",
                d.exam?.code || "",
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
