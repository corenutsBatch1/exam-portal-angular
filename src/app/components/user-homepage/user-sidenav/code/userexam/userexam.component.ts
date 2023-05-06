import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { useranswer } from 'src/app/model/model/useranswer';
import { MyserviceService } from 'src/app/model/myservice';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import swal from 'sweetalert';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-userexam',
  templateUrl: './userexam.component.html',
  styleUrls: ['./userexam.component.css'],
})

export class UserexamComponent {
  public isRadioButtonSelected = false;
  activeIndex: number = -1;
  code?: any;
  currentQuestion?: Question;
  subjectId?: number;
  uid: any;
  eid: any;
  questions: any[] =[]
  subjects: Subject[] = [];
  selectedOptions: string[] = [];
  answer:useranswer=new useranswer() ;
  uniqueSubjectNames: String[] =[];
  selected:boolean=false;
  stateChange:number[]=[];
  questionnumber:number=0;
  clickedSubject:String="";
  selectedOption: string = '';
  examminutes?:number;
  remainingTime: number=0
  timerId: any;
  TotalQuestion:Question[]=[];
  showbuttons?:boolean=false;
  codingquestionid?:number;
  examtime?:ScheduleExam=new ScheduleExam();
  totalQuestions:number=0;
  remainingQuestion:number=0;
  timeexpire?:boolean=false;
  cId?:number;

  checkboxoption?:string[]=[];
  checkboxState: { [key: number]: string[] } = {};


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: MyserviceService,
    private router: Router,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit(): void {
    // this.cId = this.service.getCId();
    // console.log(this.cId);
    this.service.runCodeClicked.subscribe((data)=>{this.cId=data

      if(this.cId!=undefined){
        if(!this.stateChange.includes(this.cId)){
          this.stateChange.push(this.cId);
        }}
      })

    this.locationStrategy.onPopState(() => {
      history.forward();
    });
    this.uid = this.service.sendid();
    this.eid = this.service.sendeid();
    this.startTimer()
    this.http.get(`http://localhost:8089/api/getquestions/${this.eid}`).subscribe(data=>{this.examtime=data
    const examtime = this.examtime.examDuration;
  if(examtime){
      this.remainingTime=60*examtime;
     }
        });

    this.route.params.subscribe((params) => {
      this.code = params['code'];
      this.http.get<any>(`http://localhost:8089/api/getquestionsBySubjectId/${this.code}`).subscribe(data=>{this.questions=data,
        this.totalQuestions=data.length;
        this.nextquestions(0,this.questions[0].optionA,this.questions[0].id);
    });
      this.loadSubjects().subscribe((subjects: Subject[]) => {
        this.subjects = subjects;
        this.uniqueSubjectNames = this.getUniqueSubjectNames(this.subjects);
        console.log(subjects);
      });
    });

  }



// Initialize the timer properties
minutes = this.remainingTime;
seconds = 0;
showTimer = true;
timerExpired = false;

// Start the timer
startTimer() {
  const timer = setInterval(() => {
    // Decrement the time remaining
    if(this.remainingTime){
    this.remainingTime--;
    this.minutes = Math.floor(this.remainingTime / 60);
    this.seconds = this.remainingTime % 60;

    // Check if the timer has expired
    if (this.remainingTime === 0 && !this.timeexpire ) {
      this.clickEvent2();
      this.timerExpired = true;
      clearInterval(timer);
    }}
  }, 1000);
  this.showTimer = false;
}

  getUniqueSubjectNames(subjects: Subject[]): String[] {
    const uniquesubjects = subjects
      .map((subjects) => subjects.name)
      .filter((name) => name !== undefined) as String[];
    return [...new Set(uniquesubjects)];
  }

  loadSubjects(): Observable<Subject[]> {
    return this.http.post<Subject[]>(
      `http://localhost:8089/api/getsubjectsBycode/${this.code}`,
      this.code
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }


  getQuestionsBySubjectName(subjectName:String):void{
    this.questions=[];
    this.subjects.forEach((subject)=>{
                  if(subject.name==subjectName){
                    this.loadQuestions(subject.id).subscribe((data)=>{this.questions=this.questions.concat(data)
                    this.questionnumber=0;
                    this.nextquestions(0,this.questions[0].optionA,this.questions[0].id);
                  })
                  }})
  }

  loadQuestions(subjectid?: number) {
    console.log("lq"+this.questions.length);
    return this.http.get(
      `http://localhost:8089/api/getquestionsBySubjectId/${subjectid}/${this.code}`
    );

  }

  showQuestion(questionId: number): void {
    this.questions.forEach((question) => {
      if (question.id == questionId) {
        this.currentQuestion = question;
      }
      console.log("showq"+this.questions.length);
    });
  }



  sendoption(qid:number,option1:string)
  {
    if(!this.stateChange.includes(qid)){
      this.stateChange.push(qid);
    }
    this.selectedOptions[qid] = option1;
    console.log("option"+option1);
    this.answer = {
      user: {
        id: this.uid,
      },
      exam: {
        id: this.eid,
      },
      question: {
        id: qid,
      },
      userAnswer: option1,
    };
       this.http.post(`http://localhost:8089/api/saveanswer`,this.answer).subscribe(data=>{
       console.log("188");
       this.selectedOption=option1;
      });
  }
  sendoption2(qid:number,option2:string){


    //this.checkboxoption=this.checkboxoption?.concat(option2);
    const selectedOptions = this.checkboxState[qid] || [];
    if (selectedOptions.includes(option2)) {
      // Remove the option if it is already selected
      this.checkboxState[qid] = selectedOptions.filter((o) => o !== option2);
    } else {
      // Add the option if it is not already selected
      this.checkboxState[qid] = [...selectedOptions, option2];
    }
  }
  submitoption(qid:any,optionarray?:any){
    // optionarray.sort();
    // //this.Questions.answer = this.answers.join('');
    // this.answer = {
    //   user: {
    //     id: this.uid,
    //   },
    //   exam: {
    //     id: this.eid,
    //   },
    //   question: {
    //     id: qid,
    //   },
    //   userAnswer:optionarray.join(''),
    // };
    //    this.http.post(`http://localhost:8089/api/saveanswer`,this.answer).subscribe(data=>{
    //    this.selectedOption=optionarray;
    //   });
     if(!this.stateChange.includes(qid)){
      this.stateChange.push(qid);
    }
    const selectedOptions = this.checkboxState[qid] || [];
    selectedOptions.sort();
    this.answer = {
      user: {
        id: this.uid,
      },
      exam: {
        id: this.eid,
      },
      question: {
        id: qid,
      },
      userAnswer: selectedOptions.join(''),
    };
    this.http.post(`http://localhost:8089/api/saveanswer`, this.answer).subscribe((data) => {
      //this.selectedOption = selectedOptions;
    });
  }


isOptionSelected(questionId: number, option: string): boolean {
       this.selectedOption=option;
    return this.selectedOptions[questionId] ===option;
  }

  isOptionSelected2(qid: number, option: string) {
    const selectedOptions = this.checkboxState[qid] || [];
    return selectedOptions.includes(option);
  }





clickEvent(exam: any) {
  this.timeexpire=true;
  var remainingQuestion=(this.totalQuestions-this.stateChange.length);
  console.log("remainingQuestion"+remainingQuestion);
  if(remainingQuestion>0){
    swal({
      title: "Remaining questions are "+ remainingQuestion + " , Are you sure you want to Submit?",
      icon: "warning",
      buttons: ['Cancel', 'Yes, Submit'],
      dangerMode: true,
    })
    .then((submitConfirmed: any) => {
      if (submitConfirmed) {
        this.router.navigate(['answers', this.code]);
      } else {
      }
       });
  }else{
    swal({
      title: "Are you sure you want to Submit? ",
      icon: "warning",
      buttons: ['Cancel', 'Yes, Submit'],
      dangerMode: true,
    })
    .then((submitConfirmed: any) => {
      if (submitConfirmed) {
        this.router.navigate(['answers', this.code]);
      } else {
      }
       });
  }
}

clickEvent2(){
  this.router.navigate(['answers', this.code]);
}


      nextquestion(){
        this.questionnumber++;
        this.currentQuestion= this.questions[this.questionnumber];

        if(this.stateChange.includes(this.currentQuestion?.id)){
          this.isRadioButtonSelected = true;
        }else{
          this.isRadioButtonSelected =false;
        }
      }

      nextquestions(id:any,option?:any,qid?:any){
        if(option==undefined)
        {
          this.codingquestionid=qid
        }
        console.log(option)
        this.showbuttons=true;
        this.questionnumber= id;
        this.currentQuestion= this.questions[id];
        id++;
        if(this.stateChange.includes(this.currentQuestion?.id)){
          this.isRadioButtonSelected = true;
        }else{
          this.isRadioButtonSelected =false;
        }
      }

      previousquestion(id:any)
      {
        id--;
        this.currentQuestion= this.questions[id];
        this.questionnumber--;
        if(this.stateChange.includes(this.currentQuestion?.id)){
          this.isRadioButtonSelected = true;
        }else{
          this.isRadioButtonSelected =false;
        }
      }

stateChangeCheck(qid:number)
{
  return this.stateChange.includes(qid);
}

setActive(index: number, subjectName:String) {
  console.log(subjectName)
  this.clickedSubject = subjectName;
  this.activeIndex = index;
  this.nextquestions(this.activeIndex)
}
}
