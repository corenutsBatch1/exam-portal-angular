import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import { MyserviceService } from 'src/app/model/myservice';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import { UserExamDetails } from 'src/app/model/model/UserExamDetails';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  exam: ScheduleExam = new ScheduleExam();
  examdetails: UserExamDetails=new UserExamDetails();
  exam1: ScheduleExam[] = [];
  isOver: boolean | undefined;
  examId?:number;
  id?:number;
  examObject?:any;
  timeDifference?:any
  minutes?:any
  rounded_minutes?:number
  constructor(
    private route1: ActivatedRoute,
    private route: Router,
    private http: HttpClient,
    private service: MyserviceService
  ) {}
  examtime: ScheduleExam = new ScheduleExam();
  isBetween?: boolean;
  userId : any;
  ngOnInit() {
  }

  clickEvent() {
    this.http.get(`http://54.64.6.102:9033/api/getallexams`).subscribe((data) => {
      console.log(data);
      this.exam1 = this.exam1.concat(data);
      console.log(this.exam1);
      const uniqueExamNames = this.getUniqueExamNames(this.exam1);
      console.log(uniqueExamNames + '5555');
      console.log(this.exam.code);
      this.examObject = uniqueExamNames.find(
        (item) => item.code === this.exam.code
      );
      console.log(this.examObject + '6666');
      this.userId = this.service.uid
      if (this.examObject == null) {
        Swal.fire('Enter Correct Code', '', 'error');
      } else {
        console.log(this.userId)
        this.http
          .get(
            `http://54.64.6.102:9033/api/examstatus/${this.examObject.id}/user/${this.userId}`
          )
          .subscribe((data) => {
            if (data == false) {
              this.http.get<UserExamDetails>(`http://54.64.6.102:9033/api/ExamDetails/${this.examObject.id}/${this.userId}`).subscribe((response)=>{
                console.log(response)
                if(response !=null){                 
                  if(response.status=="inprogress"){
                        this.conductExam()
                      }
                  }
                  else{
                    this.conductExam()
                  }
                });
            }
            else{
              Swal.fire('You already attempted exam', '', 'error');
            }
          });
      }
    });
  }
conductExam(){
  this.http
  .get(`http://54.64.6.102:9033/api/getquestions/${this.examObject.id}`)
  .subscribe((data) => {
    this.examtime = data;
    console.log('7777777777777');

   if (this.examtime.startTime && this.examtime.endTime) {
       const startTime = DateTime.fromISO(this.examtime.startTime);
       const endTime = DateTime.fromISO(this.examtime.endTime);
       const now = DateTime.local();

      const isOnSameDate = startTime.hasSame(now, 'day');
      const isOverlappingDates =
        now >= startTime && now <= endTime;
      const isBeforeEnd = now < endTime;
      const isAfterStart = now >= startTime;

      this.isBetween =
        isAfterStart &&
        isBeforeEnd &&
        (isOnSameDate || isOverlappingDates);

      const currentDate: string = now.toISODate() ?? '';
      const examStartDate: string = startTime.toISODate() ?? '';
      const examEndDate: string = endTime.toISODate() ?? '';

      const isSameDate = currentDate === examStartDate;
      const isOver =
        !isBeforeEnd || (isOnSameDate && !isAfterStart);

      this.isOver = isOver;
      if (isSameDate && now < startTime) {
        console.log('The exam has not started yet.');
        Swal.fire('The exam has not started yet.', '', 'error');
      } else if (this.isBetween) {
        console.log('The exam is currently ongoing.');
        // swal("Enter Correct Code", "", "error");
      } else if (this.isOver) {
        console.log('The exam is over.');
        Swal.fire('The exam is over', '', 'error');
      }
    }
    if (this.examObject !== undefined && this.isBetween) {
      console.log(this.examObject.id + 'senddddddddddddddd');
      this.service.examid(this.examObject.id);
      // console.log(`Exam code and id present: ${examObject.code} - ${examObject.id}`);

      this.http.get<UserExamDetails>(`http://54.64.6.102:9033/api/ExamDetails/${this.examObject.id}/${this.userId}`).subscribe((response=>{
        alert(response)
        if(response ==null){

          this.http.post<UserExamDetails>(`http://54.64.6.102:9033/api/userExamDetails/${this.examObject.id}/${this.userId}`,this.examdetails).subscribe((r1)=>{
           const examObject=r1;

        })
          this.route.navigate(['userexam', this.examObject.code])
          Swal.fire('Exam Started', '', 'success');
        }
        else{
          this.route.navigate(['userexam', this.examObject.code])
          Swal.fire('Exam Restarted', '', 'success');
        }

      }))


    }

  });
}
  getUniqueExamNames(exam: ScheduleExam[]): any[] {
    const uniqueExamNames = exam
      .filter((exam) => exam.code !== undefined && exam.id !== undefined)
      .map((exam) => ({ id: exam.id, code: exam.code }));
    return [
      ...new Set(uniqueExamNames.map((item) => JSON.stringify(item))),
    ].map((item) => JSON.parse(item));
  }



//disable Event
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

}
