import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';

@Component({
  selector: 'app-manageQuestion',
  templateUrl: './manageQuestion.component.html',
  styleUrls: ['./manageQuestion.component.css'],
})
export class ManageQuestionComponent implements OnInit {
  @Output('loadManageQuestionPage') loadManageQuestionPage = new EventEmitter();
  constructor(private http: HttpClient) {}

  question: Question = new Question();
  Questions: Question[] = [];
  subjects: Subject[] = [];
  uniqueSubjectNames?: string[];
  Topic_id?: any;
  displayedColumns: any;
  selectedsubject?: string;
  filteredTopics: Subject[] = [];
  dataSource: any;

  ngOnInit() {
    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe((data) => {
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
    this.http
      .get<Question[]>(`http://localhost:8089/api/getallquestions/${id}`)
      .subscribe((data) => {
        console.log(data);
        this.Questions = data;
      });
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
  goBack() {
    this.loadManageQuestionPage.emit(true);
  }
}
