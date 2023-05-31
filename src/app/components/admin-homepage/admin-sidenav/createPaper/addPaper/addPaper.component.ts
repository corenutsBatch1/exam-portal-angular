import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CodingQuestion } from 'src/app/model/model/CodingQuestion';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import Swal from 'sweetalert2';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-addPaper',
  templateUrl: './addPaper.component.html',
  styleUrls: ['./addPaper.component.css'],
})
export class AddPaperComponent implements OnInit {
  @Output('loadAddPaperpage') loadAddPaperpage = new EventEmitter();
  constructor(
    private http: HttpClient,
    private subjectService: SubjectService
  ) {}
  createPaper = new CreatePaper();
  subjects?: Subject[];
  questionsIdArray: number[] = [];
  codingQuestionsIdArray: number[] = [];
  isDisabled: boolean = false;
  question123?: Question[];
  codingQuestion?: CodingQuestion[];
  uniqueSubjectNames?: string[];
  subjectControl = new FormControl();
  subject_id?: number;
  selectedsubject?: string;
  filteredTopics: Subject[] = [];
  papers: CreatePaper[] = [];
  show: boolean = false;
  questionCount = 0;
  noOfQuestions?: number;
  name: string = '';
  questionsLeft?: number;

  ngOnInit(): void {
    this.subjectService.fetchSubjects().subscribe((data) => {
      this.subjects = data;
      this.uniqueSubjectNames = this.getUniqueSubjectNames(this.subjects);
    });

    const noOfQuestionsInput = document.getElementById(
      'noOfQuestions'
    ) as HTMLInputElement;
    const noOfQuestionsError = document.getElementById(
      'noOfQuestionsError'
    ) as HTMLElement;
    const totalMarksInput = document.getElementById(
      'totalMarks'
    ) as HTMLInputElement;
    const totalMarksError = document.getElementById(
      'totalMarksError'
    ) as HTMLElement;

    noOfQuestionsInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      const numQuestions = inputElement.value;
      if (!isNaN(Number(numQuestions)) && Number(numQuestions) > 0) {
        inputElement.classList.remove('is-invalid');
        noOfQuestionsError.style.display = 'none';
      } else {
        inputElement.classList.add('is-invalid');
        noOfQuestionsError.style.display = 'block';
      }
    });

    totalMarksInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      const totalMarks = inputElement.value;
      if (!isNaN(Number(totalMarks)) && Number(totalMarks) > 0) {
        inputElement.classList.remove('is-invalid');
        totalMarksError.style.display = 'none';
      } else {
        inputElement.classList.add('is-invalid');
        totalMarksError.style.display = 'block';
      }
    });
  }
  allFieldsFilled = false;

  checkAllFieldsFilled() {
    if (
      this.createPaper.name &&
      this.createPaper.numberOfQuestions &&
      this.createPaper.totalMarks &&
      this.selectedsubject &&
      this.subject_id &&
      this.questionsIdArray.length >= 0
    ) {
      this.allFieldsFilled = true;
    } else {
      this.allFieldsFilled = false;
    }
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

  getquestions(id: any) {
    if (this.selectedsubject != 'CODING') {
      this.http
        .get<Question[]>(`http://localhost:9033/api/getallquestions/${id}`)
        .subscribe((data) => {
          this.question123 = data.filter((q) => q.status == 'active');
        });
    } else {
      this.http
        .get<CodingQuestion[]>(`http://localhost:9033/api/fetchcodingquestions`)
        .subscribe((data) => {
          this.codingQuestion = data.filter((q) => q.status == 'active');
        });
    }
  }

  addpaper(createPaper: CreatePaper) {
    createPaper.questionsListArray = this.questionsIdArray;
    createPaper.codingQuestionsListArray = this.codingQuestionsIdArray;
    if (this.noOfQuestions && this.questionCount < this.noOfQuestions) {
      this.questionsLeft = this.noOfQuestions - this.questionCount;
      Swal.fire(
        'You have to add ' + this.questionsLeft + ' more questions',
        '',
        'error'
      );
    } else {
      this.http
        .post<CreatePaper>(`http://localhost:9033/api/addpaper`, createPaper)
        .subscribe(
          (data) => {
            Swal.fire('Paper created successfully', '', 'success');
            this.goBack();
          },
          (error) => {
            Swal.fire('All field must be required', '', 'error');
          }
        );
    }
  }

  goBack() {
    this.loadAddPaperpage.emit(true);
  }

  checkboxChanged(event: any, optionValue?: number, subjectName?: string) {
    if (event.checked) {
      if (this.noOfQuestions && this.questionCount < this.noOfQuestions) {
        if (subjectName?.toLowerCase() === 'coding') {
          this.codingQuestionsIdArray.push(optionValue as number);
          this.questionCount++;
        } else {
          this.questionsIdArray.push(optionValue as number);
          this.questionCount++;
        }
      } else {
        setTimeout(() => {
          Swal.fire(
            'You have reached the maximum number of questions.',
            '',
            'error'
          );
          event.source.checked = false;
        }, 0);
      }
    } else {
      const index = this.questionsIdArray.indexOf(optionValue as number);
      if (index !== -1) {
        this.questionsIdArray.splice(index, 1);
        this.questionCount--;
      }
    }
  }
}
