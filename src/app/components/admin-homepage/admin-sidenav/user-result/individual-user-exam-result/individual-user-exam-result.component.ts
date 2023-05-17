import { HttpClient } from '@angular/common/http';
import { Component,ViewChild, EventEmitter, Output } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, startWith,map } from 'rxjs';
import { Marks } from 'src/app/model/model/Marks';
import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import 'chartjs-plugin-datalabels';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/model/model/Question';
import { useranswer } from 'src/app/model/model/useranswer';
import { UserCode } from 'src/app/model/model/UserCode';


export interface PeriodicElement {
  serialNumber: number;
  examCode: string;
  name: string;
  totalMarks: number;
  obtainedMarks :number;

}

@Component({
  selector: 'app-individual-user-exam-result',
  templateUrl: './individual-user-exam-result.component.html',
  styleUrls: ['./individual-user-exam-result.component.css']
})
export class IndividualUserExamResultComponent {

  @Output("loadIndividualUserExamResult") loadIndividualUserExamResult = new EventEmitter();


  goBack() {
    this.loadIndividualUserExamResult.emit(true);
  }
  usercodes?:UserCode;
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
  uniqueexamcodes:any[]=[];
  usernames:any[]=[]
  codeControl =new FormControl();
  usernamecontrol=new FormControl();
  filteredCodes:String[]=[]
  questions:Question[]=[]
  userAnswers:useranswer[]=[]
  uid:any;
  eid:any;
  filteredUsernames:any[]=[]
  searchusername:any;
  dataSource = new MatTableDataSource<Marks>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private titleService: Title,private http:HttpClient) {
    this.filteredCodes = this.uniqueexamcodes;
    this.codeControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCodes(value))
    ).subscribe(filteredCodes => {
      this.filteredCodes = filteredCodes;
    });
    this.filteredUsernames = this.usernames;
    this.usernamecontrol.valueChanges.pipe(
      startWith(''),
      map(value => this.filterNames(value))
    ).subscribe(filteredCodes => {
      this.filteredUsernames = filteredCodes;
    });
  }


  ngOnInit(): void {
    this.getMarks().subscribe((data)=>{this.marks=data
                                    this.dataSource.data=this.marks
                                    this.dataSource.paginator = this.paginator;
                                    this.marks.forEach(a=>this.uniqueexamcodes.push(a.exam?.code))
                                    this.uniqueexamcodes=[...new Set(this.uniqueexamcodes)]
                                    this.filteredCodes = this.uniqueexamcodes;

                                })
                                console.log("in on it")
                                console.log(this.filteredUsernames);
  }
  filterCodes(value: any): any {
    const filterValue = value.toLowerCase();
    return this.uniqueexamcodes.filter(code => code.toLowerCase().includes(filterValue));
  }
  filterNames(value: any): any {
    const filterValue = value.toLowerCase();
    return this.usernames.filter(code => code.toLowerCase().includes(filterValue));
  }
  // onUsernameChange() {
  //   console.log("in onusernamechange");
  //   console.log(this.filteredUsernames);

  //   const filterValue = this.usernamecontrol.value.toLowerCase().trim();
  //   console.log(filterValue+"i-----------------")
  //   console.log(this.usernamecontrol.value)
  //   this.filteredUsernames = this.usernames.filter(username =>
  //     username.toLowerCase().includes(filterValue)
  //   );

  //   console.log(this.filteredUsernames);
  // }

  oncodeSelection() {
    this.usernames.splice(0,this.usernames.length)
    this.marks.forEach(a=>{
      if(a.exam && a.exam.code==this.codeControl.value) {
        this.usernames.push(a.user?.name);

        console.log("in oncodeselection")
           this.filteredUsernames=this.usernames;
           console.log(this.filteredUsernames)
          }
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





  generatePDF(): void {
    if(this.questions){
    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Exam Result Data', style: 'header' },
        `User Name: ${this.username3 || ""}\n`,
        `Exam Name: ${this.examname || ""}\n`,
        `Total Marks: ${this.totalmarks || 0}\n`,
        `Obtained Marks: ${this.gotmarks || 0}`,
        `-----------------------------------`,
        {
          text: `Exam Paper`,
          style: 'header'
        },
        {
          ol: this.questions.map((question, i) => {
            const listItems = [];

            // Use a regular expression to remove HTML tags from the question content
            const questionContent = question?.content?.replace(/<[^>]*>/g, '');

            if (questionContent) {
              listItems.push(questionContent);
            }

            // Add the answer options and user answer (if available) to the listItems array
            if (question?.subject?.name !== 'CODING') {
              listItems.push(`A) ${question?.optionA}`);
              listItems.push(`B) ${question?.optionB}`);
              listItems.push(`C) ${question?.optionC}`);
              listItems.push(`D) ${question?.optionD}`);
              listItems.push(`             `);

              const answer = this.userAnswers.find(answer => answer?.question?.id === question?.id);

              if (answer) {
                  listItems.push(`YourAnswer : ${answer.userAnswer}`);
              }

              listItems.push(`CorrectAnswer : ${question?.answer}`);
              listItems.push('\n');

            } else {
              listItems.push('\n');
            }

            // Map each list item string to an ordered list item object with a `text` property
            return listItems.map(item => ({ text: item }));
          })
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
  console.log("in exam result")
  this.marks.forEach(a=>{
    if(a.exam && a.exam.code==this.codeControl.value &&  a.user?.name==this.usernamecontrol.value) {
          this.username3=a.user?.name;
          this.examname=a.exam.name;
          this.totalmarks=a.totalMarks;
          this.gotmarks=a.marks;
          this.uid=a.user?.id;
          this.eid=a.exam.id;
          console.log(this.uid)
          console.log()
        }

})
if(this.uid){
  this.http.get<Question[]>(`http://localhost:8089/api/getquestionsBySubjectId/${this.codeControl.value}`).subscribe(data=>
  this.questions=data);

  this.http.get(`http://localhost:8089/api/getusercodes/${this.uid}/${this.eid}`).subscribe(data=>{this.usercodes=data
  console.log(this.usercodes.iscorrect)
  console.log(data)
});

  this.http.get<useranswer[]>(`http://localhost:8089/api/getUserAnswers/${this.uid}/${this.eid}`).subscribe(data=>
    this.userAnswers=data);
}


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


}
