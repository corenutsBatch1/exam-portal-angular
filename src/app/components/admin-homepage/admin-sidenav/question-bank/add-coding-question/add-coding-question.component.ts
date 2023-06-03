import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { CodingQuestion } from 'src/app/model/model/CodingQuestion';
import { Subject } from 'src/app/model/model/Subject';
import { TestCases } from 'src/app/model/model/TestCases';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
interface InputField {
  // value: string;
  input: string;
  output: string;
}

@Component({
  selector: 'app-add-coding-question',
  templateUrl: './add-coding-question.component.html',
  styleUrls: ['./add-coding-question.component.css'],
})
export class AddCodingQuestionComponent {
  @Output('loadAddCodingQuestionPage') loadAddCodingQuestionPage =
    new EventEmitter();

  subjects?: Subject[];
  uniqueSubjectNames: string[] = [];
  codingQuestion: CodingQuestion = new CodingQuestion();
  testCases: TestCases = new TestCases();
  testCasesArray: TestCases[] = [];
  questionForm: FormGroup;
  subjectControl = new FormControl();
  selectedsubject?: string;
  subject_id?: number;
  questionContent?: string;
  inputs: InputField[] = [];
  filteredTopics: Subject[] = [];
  codingQuestionId?: number;
  getCodingQuestion: CodingQuestion[] = [];
  testcases: TestCases[] = [];
  public Editor = ClassicEditor;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService
  )
  {
    this.questionForm = this.formBuilder.group({
      question: '',
      options: this.formBuilder.array([this.createOption()]),
    });
  }

  ngOnInit(): void {
    this.subjectService.fetchSubjects().subscribe((data) => {
      this.subjects = data;
      this.uniqueSubjectNames = this.getUniqueSubjectNames(this.subjects);
    });
  }

  getUniqueSubjectNames(subjects: Subject[]): string[] {
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter(
        (name) => name !== undefined && name.toLowerCase() === 'coding'
      ) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

  onSubjectSelection() {
    if (this.selectedsubject) {
      this.filteredTopics = this.subjects!.filter(
        (t) => t.name === this.selectedsubject
      );
    }
  }

  addInput() {
    this.inputs.push({ input: '', output: '' });
  }

  removeInput() {
    this.inputs.pop();
  }

  createOption(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  onSubmit(id?: number): void {
    this.codingQuestion.content = this.questionContent;
    this.http
      .post(
        `http://54.64.6.102:9033/api/subject/${id}/codingquestion`,
        this.codingQuestion
      )
      .subscribe(
        (response) => {
          this.getallcodingquestions(id);
          Swal.fire('Question added successfully', '', 'success');
          this.clearForm();
          this.inputs.length=0;
        },

        (error) => {
          Swal.fire('All field must be required', '', 'error');
        }
      );
  }

  getallcodingquestions(id?: number) {
    this.http
      .get(`http://54.64.6.102:8089/api/subject/${id}/codingquestions`)
      .subscribe((data) => {
        this.getCodingQuestion = this.getCodingQuestion.concat(data);
        this.addTestCases();
      });
  }

  addTestCases() {
    this.getCodingQuestion.forEach((data) => {
      if (data.content === this.questionContent) {
        this.codingQuestionId = data.id;
      }
    });
    this.inputs.forEach((data) => {
      this.testCases.input = data.input;
      this.testCases.expectedOutput = data.output;
      this.http
        .post(
          `http://54.64.6.102:9033/api/addtestcases/${this.codingQuestionId}`,
          this.testCases
        )
        .subscribe((data) => console.log(data));
    });
  }

    // Function to handle the clear button action
    clearForm() {
      this.questionForm.reset(); // Reset the form to its initial state
    }

  goBack() {
    this.loadAddCodingQuestionPage.emit(true);
  }
}
