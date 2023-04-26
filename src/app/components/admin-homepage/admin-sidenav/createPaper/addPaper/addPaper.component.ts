
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import swal from 'sweetalert';

@Component({
  selector: 'app-addPaper',
  templateUrl: './addPaper.component.html',
  styleUrls: ['./addPaper.component.css']
})
export class AddPaperComponent implements OnInit {
  @Output('loadAddPaperpage') loadAddPaperpage = new EventEmitter();
  constructor(private http :HttpClient) { }
  createPaper=new CreatePaper();
  subjects?:Subject[];
  questionsIdArray:number[]=[];


  question123?:Question[];
  uniqueSubjectNames?:string[];
  subjectControl = new FormControl();
  subject_id?:number;
  selectedsubject?:string;
  filteredTopics: Subject[] = [];
  papers:CreatePaper[]=[];
  ngOnInit(): void {

    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe(data=>{
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
    this.http.get<Question[]>(`http://localhost:8089/api/getallquestions/${id}`).subscribe(data=>{
      console.log(data);
        this.question123=data;
             })

  }
  addquestions(questionId?:number)
  {
    console.log(questionId)
    if (questionId) {
      console.log("question id is not --null")
      this. questionsIdArray =  this.questionsIdArray.concat(questionId);

    }    console.log(this.questionsIdArray);
   // console.log(exam.questions);
   // console.log(exam.name)
  }

addpaper(createPaper:CreatePaper)
{
  createPaper.questionsListArray=this.questionsIdArray;
  console.log("-------------------------------------")
  console.log(createPaper.questionsListArray)
  this.http.post<CreatePaper>(`http://localhost:8089/api/addpaper`,createPaper).subscribe(data=>{
    swal("Paper created successfully","", "success");
  this.goBack();

});
}
goBack() {
  console.log(this.loadAddPaperpage)
     this.loadAddPaperpage.emit(true);
     console.log(this.loadAddPaperpage)

     }


}
