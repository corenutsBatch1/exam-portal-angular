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
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

  onSubjectSelection() {
    if (this.selectedsubject) {
      this.filteredTopics = this.subjects!.filter(
        (t) => t.name === this.selectedsubject
      );
    }
  }

  getQuestionsBySubId(id: any) {
    console.log('=====================================');
    console.log(id);
    this.Topic_id = id;
    if (this.selectedsubject !== 'CODING') {
      this.http
        .get<any[]>(`http://localhost:9033/api/getallquestions/${id}`)
        .subscribe((data) => {
          this.Questions = data.filter(question => question.status === 'active');
        });
    } else {
      this.http
        .get<any[]>(`http://localhost:9033/api/fetchcodingquestions`)
        .subscribe((data) => {
          console.log(data);
          this.codingQuestion = data.filter(question => question.status === 'active');
          console.log(this.codingQuestion);
        });
    }
  }




  getQuestionsById(id: any) {
    this.http
      .get<Question>(`http://localhost:9033/api/getquestionbyid/${id}`)
      .subscribe((data) => {
        console.log(data);
        this.question = data;
        console.log(this.question);
      });
  }
  editquestion(question: Question) {
    this.http
      .put<Question>(`http://localhost:9033/api/updatequestion`, question)
      .subscribe((data) => {
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
        this.deleteQuestion(id).subscribe((data)=>
        {
          console.log(data);
          console.log("enter");

          if(data == "OK"){
            Swal.fire("Success", "Question deleted successfully.", "success");
            this.getQuestionsBySubId(this.Topic_id);
          }
          else{
            Swal.fire("Error", "An error occurred while deleting.", "error");
          }
        }
        )
      } else {

        console.log('Delete cancelled by user');
      }
    });
   }


  deleteQuestion(id?:number){
    console.log(id);
   return this.http.delete(`http://localhost:9033/api/deleteQuestion/${id}`)
  }

  goBack() {
    this.loadManageQuestionPage.emit(true);
  }
}
