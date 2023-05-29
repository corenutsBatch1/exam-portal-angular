import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { useranswer } from 'src/app/model/model/useranswer';
import { MyserviceService } from 'src/app/model/myservice';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';

import { UserExamDetails } from 'src/app/model/model/UserExamDetails';
import * as moment from 'moment';

import { FullScreenServiceService } from 'src/app/services/full-screen-service.service';



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
  // questions: any[] =[]
  subjects: Subject[] = [];
  selectedOptions =new Map();
  answer:useranswer=new useranswer() ;
  uniqueSubjectNames: String[] =[];
  selected:boolean=false;
  stateChange:any[]=[];
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
  id?:number;
  codeId?:String;
  minutes1?:number=0
  examtime1?:number
  answerMap=new Map();
  answerArray:any[]=[];
  isCheckedA:boolean=false;
  isCheckedB:boolean=false;
  isCheckedC:boolean=false;
  isCheckedD:boolean=false;
  isChecked:boolean=false;
  checkboxoption?:string[]=[];
  checkboxState: { [key: number]: string[] } = {};

  examdetails: UserExamDetails=new UserExamDetails();
  activeSubject: string | undefined;
  questions: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: MyserviceService,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private fullscreenService : FullScreenServiceService
  ) {}



  ngOnInit(): void {
    this.enableFullscreen()
    this.service.runCodeClicked.subscribe((data)=>{this.cId=data

      if(this.cId!=undefined){
        this.codeId = 'C' + this.cId
        if(!this.stateChange.includes(this.codeId)){
          this.stateChange.push(this.codeId);
          console.log(this.codeId);
          console.log(this.stateChange)
        }}
      })

    this.locationStrategy.onPopState(() => {
      history.forward();
    });
    this.uid = this.service.sendid();
    this.eid = this.service.sendeid();
    this.startTimer()
    this.fetchExamTime().then(()=>{
      this.afterFetchExamTime();
    })

    this.route.params.subscribe((params) => {
      this.code = params['code'];
      this.http.get<any>(`http://localhost:9033/api/getquestionsBySubjectId/${this.code}`).subscribe(data=>{this.questions=data,
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


  enableFullscreen() {
    this.fullscreenService.enableFullscreen();
  }
  async fetchExamTime(){

    this.http.get<UserExamDetails>(`http://localhost:9033/api/ExamDetails/${this.eid}/${this.uid}`).subscribe(async (response)=>{
      if (response && response.loginTime && response.logoutTime){
      const loginTime: moment.Moment = moment(response.loginTime, 'HH:mm:ss'); // Replace with your actual login time
      const logoutTime: moment.Moment = moment(response.logoutTime, 'HH:mm:ss'); // Replace with your actual logout time

      const duration: moment.Duration = moment.duration(logoutTime.diff(loginTime));
      this.minutes1 =Math.round(duration.asMinutes());
      console.warn(this.minutes1+"minus minutes in response")
      await this.asyncOperation()

      }
    })}

    afterFetchExamTime(){
      this.http.get(`http://localhost:9033/api/getquestions/${this.eid}`).subscribe(data=>{this.examtime=data
      console.warn("into the object"+this.minutes1)
      if(this.minutes1 != 0){
        console.warn(this.minutes1+"minus minutes")
      this.examtime1 = this.examtime.examDuration!-this.minutes1!
        console.warn(this.examtime1+"  examtime when restarted")
      if(this.examtime1){
        this.remainingTime=60*this.examtime1;
        this.remainingTime
        }
      }
      else{
        this.examtime1 = this.examtime.examDuration
        console.warn(this.examtime1+"  examtime when started ")
      if(this.examtime1){
        this.remainingTime=60*this.examtime1;
        }
      }
      });}
      async asyncOperation() {
        // Simulating an asynchronous operation
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      }
  // @HostListener('document:keydown.escape', ['$event'])
  // handleEscapeKey(event: KeyboardEvent) {
  //   this.fullscreenService.preventExitOnEscape(event);
  // }




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
      `http://localhost:9033/api/getsubjectsBycode/${this.code}`,
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
      `http://localhost:9033/api/getquestionsBySubjectId/${subjectid}/${this.code}`
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
    const normalQuestionOptionId = "N" + qid;
    if(!this.stateChange.includes(normalQuestionOptionId)){
      this.stateChange.push(normalQuestionOptionId);
    }
    this.selectedOptions.set(qid,option1);
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
       this.http.post(`http://localhost:9033/api/saveanswer`,this.answer).subscribe(data=>{
       console.log("188");
       this.selectedOption=option1;
       console.warn(this.eid +"   n   "+ this.uid)
       this.http.put<UserExamDetails>(`http://localhost:9033/api/userExamDetailsbyid/${this.eid}/${this.uid}`,this.examdetails).subscribe((response=>{

       }))
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

    const normalQuestionOptionId = "N" + qid;
    if(!this.stateChange.includes(normalQuestionOptionId)){
      this.stateChange.push(normalQuestionOptionId);
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
    this.http.post(`http://localhost:9033/api/saveanswer`, this.answer).subscribe((data) => {
      //this.selectedOption = selectedOptions;
    });
  }


  isOptionSelected(questionId: number, option: string): boolean {
    // console.log("31-34");
    console.log(this.answerArray,"is oprtion selected");
   console.log( this.answerArray.filter(e=>e.question_id==questionId),"after filtering ")
    this.selectedOption=option;
 return this.answerArray.filter(e=>e.question_id==questionId)[0].user_answer==option;
}


isOptionSelected2(qid: number, option: string): boolean {
  // console.log("35");
  const selectedOptions = this.checkboxState[qid] || [];
  return selectedOptions.includes(option);
}

clickEvent(exam: any) {

  var remainingQuestion=(this.totalQuestions-this.stateChange.length);
  console.log("remainingQuestion"+remainingQuestion);
  if(remainingQuestion>0){
    Swal.fire({
      title: "Remaining questions are "+ remainingQuestion + " , Are you sure you want to Submit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['answers', this.code]);
        this.http.put<UserExamDetails>(`http://localhost:9033/api/userExamDetailssubmit/${this.eid}/${this.uid}`,this.examdetails).subscribe((response=>{
        console.log("submitted"+response)
      }))

      } else {
      }
       });
  }else{
    Swal.fire({
      title: "Are you sure you want to Submit? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel"
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['answers', this.code]);
        this.http.put<UserExamDetails>(`http://localhost:9033/api/userExamDetailssubmit/${this.eid}/${this.uid}`,this.examdetails).subscribe((response=>{
        console.log("submitted"+response)
      }))
      } else {
      }
       });
  }
  this.timeexpire=true;
}

clickEvent2(){
  this.router.navigate(['answers', this.code]);
  this.http.put<UserExamDetails>(`http://localhost:9033/api/userExamDetailssubmit/${this.eid}/${this.uid}`,this.examdetails).subscribe((response=>{
      console.log("submitted"+response)
      }))
      this.timeexpire=true;
}


nextquestion(){
  this.isCheckedA=false;
  this.isCheckedB=false;
  this.isCheckedC=false;
  this.isCheckedD=false;
  this.isChecked=false;
  console.log("39");
  this.questionnumber++;
  this.currentQuestion= this.questions[this.questionnumber];
  console.log(this.currentQuestion);
  this.http.get<any[]>(`http://localhost:9033/api/byquestionnumber/${this.uid}/${this.eid}`).subscribe((data) => {

    console.log("30");
    console.log(data);
    this.answerArray=data;
    if(this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id).length!=0)
    {
      // alert("Something")
      console.log("ok option is getting");
      let qMap=this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id)[0]
      console.log(qMap)
      // alert(qMap.user_answer);
      if(qMap.user_answer=='A')
      {
        this.isCheckedA=true;
        console.log("qmapA")
      }
      else if(qMap.user_answer=='B')
      {
        this.isCheckedB=true;
        console.log("qMapB");
      }
      else if(qMap.user_answer=='C')
      {
        this.isCheckedC=true;
        console.log("qMapC");
      }
      else if(qMap.user_answer=='D')
      {
        this.isCheckedD=true;
        console.log("qMapD");
      }
    }
    else
    {
      this.isChecked=true;
      this.isCheckedA=false;
      // alert("Nothing1"+this.isCheckedA)
      this.isCheckedB=false;
      this.isCheckedC=false;
      this.isCheckedD=false;

    }
  });

}

      nextquestions(id:any,option?:any,qid?:any){
        this.isCheckedA=false;
        this.isCheckedB=false;
        this.isCheckedC=false;
        this.isCheckedD=false;
        this.isChecked=false;
        if(option==undefined)
        {
          this.codingquestionid=qid
        }
        this.showbuttons=true;
        this.questionnumber= id;
        this.currentQuestion= this.questions[id];
        id++;
        this.http.get<any[]>(`http://localhost:9033/api/byquestionnumber/${this.uid}/${this.eid}`).subscribe((data) => {
          this.answerArray=data;
          if(data.length>0){
            // alert(data.length);
            this.answerArray.map(
              q =>{
                const normalQuestionOptionId = "N" + q.question_id;
                if(!this.stateChange.includes(normalQuestionOptionId)){
                this.stateChange.push(normalQuestionOptionId);
              }
            }

            )
          }
          if(this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id).length!=0)
          {
            let qMap=this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id)[0]
            if(qMap.user_answer=='A')
            {
              this.isCheckedA=true;
            }
            else if(qMap.user_answer=='B')
            {
              this.isCheckedB=true;
            }
            else if(qMap.user_answer=='C')
            {
              this.isCheckedC=true;
            }
            else if(qMap.user_answer=='D')
            {
              this.isCheckedD=true;
            }
          }
          else
          {
            this.isChecked=true;
            this.isCheckedA=false;
            this.isCheckedB=false;
            this.isCheckedC=false;
            this.isCheckedD=false;
          }
        });

      }

      previousquestion(id:any)
      {

        this.isCheckedA=false;
        this.isCheckedB=false;
        this.isCheckedC=false;
        this.isCheckedD=false;
        this.isChecked=false;
        console.log("46");
        id--;
        this.currentQuestion= this.questions[id];
        this.questionnumber--;
        this.http.get<any[]>(`http://localhost:9033/api/byquestionnumber/${this.uid}/${this.eid}`).subscribe((data) => {
          this.answerArray=data;
          if(this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id).length!=0)
          {
            let qMap=this.answerArray.filter(q=> q.question_id==this.currentQuestion?.id)[0]
            if(qMap.user_answer=='A')
            {
              this.isCheckedA=true;
            }
            else if(qMap.user_answer=='B')
            {
              this.isCheckedB=true;
            }
            else if(qMap.user_answer=='C')
            {
              this.isCheckedC=true;
            }
            else if(qMap.user_answer=='D')
            {
              this.isCheckedD=true;
            }
          }
          else
          {
            this.isChecked=true;
            this.isCheckedA=false;
            this.isCheckedB=false;
            this.isCheckedC=false;
            this.isCheckedD=false;
          }
        });

      }


stateChangeCheck(qid:number, subject : Subject)
{
  console.log(this.stateChange)
  if(subject.name == 'CODING'){
    const codingQuestionId = 'C' + qid
    return this.stateChange.includes(codingQuestionId);
  }else{
    const normalQuestionId = 'N'+qid
    return this.stateChange.includes(normalQuestionId);
  }
}


setActive(index: number, subjectName:String) {
  console.log(subjectName)
  this.clickedSubject = subjectName;
  this.activeIndex = index;
  this.nextquestions(this.activeIndex)
}


//disable right click
disableRightClick(event: MouseEvent): void {
  event.preventDefault();

}
}
