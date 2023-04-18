
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Exam } from 'src/app/model/model/Exam';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';

@Component({
  selector: 'app-addPaper',
  templateUrl: './addPaper.component.html',
  styleUrls: ['./addPaper.component.css']
})
export class AddPaperComponent implements OnInit {
  @Output('loadAddPaperpage') loadAddPaperpage = new EventEmitter();
  constructor(private http :HttpClient) { }
  exam=new Exam();
  subjects?:Subject[];
  questions1?:Question[];

  question123?:Question[];
  //questions1?:Question[];

  uniqueSubjectNames?:string[];
  subjectControl = new FormControl();
  subject_id?:number;
  selectedsubject?:string;
  filteredTopics: Subject[] = [];
  ngOnInit(): void {

    this.http.get<Subject[]>(`http://localhost:8088/api/getAllSubjects`).subscribe(data=>{
      console.log(data);
       this.subjects=data;
       console.log(this.subjects);
       console.log("---------------")
      this.uniqueSubjectNames= this.getUniqueSubjectNames(this.subjects);
    })
  }

  getUniqueSubjectNames(subjects: Subject[]): string[] {
    console.log("---pppppppppppppp")
    console.log(subjects)
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

   onSubjectSelection() {
    //const value = event.value;
    if (this.selectedsubject) {
      console.log("==============")
      // Filter topics based on selected subject
      console.log(this.selectedsubject)
      console.log(this.subjects)
      this.filteredTopics = this.subjects!.filter((t) => t.name === this.selectedsubject);

    } else {
     // this.filteredTopics = undefined;
    }
  }
  getquestions(id:any)
  {
    this.http.get<Question[]>(`http://localhost:8088/api/getallquestions/${id}`).subscribe(data=>{
      console.log(data);
        this.question123=data;
             })

  }
  addquestions(question:Question)
  {
    console.log(question)
    if (question) {
      console.log("===============================")
      this.questions1 = this.questions1 ? this.questions1.concat(question) : [question];
    }    console.log(this.questions1);
   // console.log(exam.questions);
   // console.log(exam.name)
  }
addpaper(exam:Exam)
{
  exam.questions=this.questions1;
  console.log("-------------------------------------")
  console.log(exam.questions)
  this.http.post<Exam>(`http://localhost:8088/api/addexam`,exam).subscribe(data=>console.log(data));
}
goBack() {
     this.loadAddPaperpage.emit(true);
     }

}
