// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-Exam',
//   templateUrl: './Exam.component.html',
//   styleUrls: ['./Exam.component.css']
// })
// export class ExamComponent implements OnInit {
//   currentQuestion?: number;
//   constructor() { }

//   ngOnInit() {
//   }


//   showQuestion(questionNumber: number): void {
//     this.currentQuestion = questionNumber;
//   }

//   getQuestionText(questionNumber: number): string {
//     // replace with your own logic to get the question text from a database or other data source
//     switch (questionNumber) {
//       case 1:
//         return 'What is the capital of France?';
//       case 2:
//         return 'What is the largest planet in our solar system?';
//       case 3:
//         return 'What is the formula for calculating the area of a circle?';
//       // add more cases here for each question
//       default:
//         return '';
//     }
//   }

// }
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/model/Question';



@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  code?: any;
  currentQuestion?: Question ;

  questions: Question[] = [];
  // id?:number=this.currentQuestion?.id;

  constructor(private http: HttpClient,private route:ActivatedRoute) {}

  ngOnInit(): void {
    // this.loadQuestions().subscribe((questions: Question[]) => {
    //   this.questions = questions;
    // });
    this.route.params.subscribe(params => {
      this.code = params['code'];
      console.log('Exam code:', this.code);
      this.loadQuestions().subscribe((questions: Question[]) => {
          this.questions = questions.sort((a, b) => a.id - b.id);
          console.log(this.questions)
        });
    });

  }

  loadQuestions(): Observable<Question[]> {
    return this.http.post<Question[]>(`http://localhost:8089/api/getquestionsBycode/${this.code}`,this.code);
  }

  showQuestion(questionId: number): void {
    this.loadQuestion(questionId).subscribe((question: Question) => {
      this.currentQuestion = question;
      console.log(this.currentQuestion)
    });
  }

  loadQuestion(questionId: number): Observable<Question> {
    return this.http.get<Question>(`http://localhost:8089/api/getquestionbyid/${questionId}`);
  }
}

