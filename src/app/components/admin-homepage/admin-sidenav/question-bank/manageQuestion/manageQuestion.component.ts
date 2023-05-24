import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CodingQuestion } from 'src/app/model/model/CodingQuestion';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manageQuestion',
  templateUrl: './manageQuestion.component.html',
  styleUrls: ['./manageQuestion.component.css'],
})
export class ManageQuestionComponent implements OnInit {
  @Output('loadManageQuestionPage') loadManageQuestionPage = new EventEmitter();
  constructor(private http: HttpClient,private subjectService : SubjectService) {}

  question: Question = new Question();
  Questions: Question[] = [];
  codingQuestion : CodingQuestion[] = []
  subjects: Subject[] = [];
  uniqueSubjectNames?: string[];
  Topic_id?: any;
  displayedColumns: any;
  selectedsubject?: string;
  filteredTopics: Subject[] = [];
  dataSource: any;

  allFieldsFilled=false;
  checkAllFieldsFilled(){
    if(
    this.selectedsubject&&this.Topic_id
    )
    {
      console.log("-------------------------")
      this.allFieldsFilled = true;
    } else {
      // console.log("-------------------------")
      this.allFieldsFilled = false;
    }
  }


  ngOnInit() {
    this.subjectService.fetchSubjects().subscribe((data) => {
        console.log(data);
        this.subjects = data;
        console.log(this.subjects);
        console.log('---------------');
        this.uniqueSubjectNames = this.getUniqueSubjectNames(this.subjects);
      });
  }

  getUniqueSubjectNames(subjects: Subject[]): string[] {
    console.log(subjects);
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

  onSubjectSelection() {
    if (this.selectedsubject) {
      console.log('==============');
      // Filter topics based on selected subject
      console.log(this.selectedsubject);
      console.log(this.subjects);
      this.filteredTopics = this.subjects!.filter(
        (t) => t.name === this.selectedsubject
      );
    } else {
      // this.filteredTopics = undefined;
    }
  }

  getQuestionsBySubId(id: any) {
    console.log('=====================================');
    console.log(id);
    this.Topic_id = id;
    if(this.selectedsubject!= 'CODING'){
      this.http
      .get<Question[]>(`http://localhost:8089/api/getallquestions/${id}`)
      .subscribe((data) => {
        console.log(data);
        this.Questions = data;
      });
    }else{
      this.http
      .get<CodingQuestion[]>(`http://localhost:8089/api/fetchcodingquestions`)
      .subscribe((data) => {
        console.log(data);
        this.codingQuestion = data;
        console.log(this.codingQuestion);
      });
    }
  }

  getQuestionsById(id: any) {
    this.http
      .get<Question>(`http://localhost:8089/api/getquestionbyid/${id}`)
      .subscribe((data) => {
        console.log(data);
        this.question = data;
        console.log(this.question);
      });
  }
  editquestion(question: Question) {
    this.http
      .put<Question>(`http://localhost:8089/api/updatequestion`, question)
      .subscribe((data) => {
        // console.log(data)
        console.log('------------------------------------');
        console.log(question.qtype);
        console.log(this.Topic_id);
        this.getQuestionsBySubId(this.Topic_id);
      });
  }
  deleteQuestionInfo(id?:number){
    Swal.fire({
      title: "Are you sure you want to Delete? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    })

    .then((result) => {
      if (result.isConfirmed) {

        this.deleteQuestion(id).subscribe((data)=>console.log(data)
        ,
          error => {
            Swal.fire("Error", "An error occurred while deleting.", "error");
            console.log(error);
          })
          // .pipe(
          //   catchError((error: any) => {
          //     console.error('Error deleting question:', error);
          //   swal({
          //     title: "Unable to delete",
          //     text: "This question present in one paper set, first delete the paper set",
          //     icon: "error",
          //   });
          //   return throwError(error);
          //   })
          // )
          // .subscribe(response => {
          //   console.log('Question deleted:', response);
          //   location.reload();
          // });

      } else {
        console.log('Delete cancelled by user');
      }
    });
   }
  deleteQuestion(id?:number){
    console.log(id);
   return this.http.delete(`http://localhost:8089/api/deleteQuestion/${id}`)
  }
  goBack() {
    this.loadManageQuestionPage.emit(true);
  }
}
