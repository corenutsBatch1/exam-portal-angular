import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleExam } from 'src/app/model/model/ScheduleExam';
import { MyserviceService } from 'src/app/model/myservice';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  exam: ScheduleExam = new ScheduleExam();
  exam1: ScheduleExam[] = [];
  isOver: boolean | undefined;
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
    this.http.get(`http://localhost:8089/api/getallexams`).subscribe((data) => {
      console.log(data);
      this.exam1 = this.exam1.concat(data);
      console.log(this.exam1);
      const uniqueExamNames = this.getUniqueExamNames(this.exam1);
      console.log(uniqueExamNames + '5555');
      console.log(this.exam.code);
      const examObject = uniqueExamNames.find(
        (item) => item.code === this.exam.code
      );
      console.log(examObject + '6666');
      this.userId = this.service.uid
      if (examObject == null) {
        Swal.fire('Enter Correct Code', '', 'error');
      } else {
        console.log(this.userId)
        this.http
          .get(
            `http://localhost:8089/api/examstatus/${examObject.id}/user/${this.userId}`
          )
          .subscribe((data) => {
            if (data == false) {
              this.http
                .get(`http://localhost:8089/api/getquestions/${examObject.id}`)
                .subscribe((data) => {
                  this.examtime = data;
                  console.log('7777777777777');

                  if (this.examtime.startTime && this.examtime.endTime) {
                    const startTime = DateTime.fromISO(this.examtime.startTime);
                    const endTime = DateTime.fromISO(this.examtime.endTime);
                    const now = DateTime.local();

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
                  if (examObject !== undefined && this.isBetween) {
                    console.log(examObject.id + 'senddddddddddddddd');
                    this.service.examid(examObject.id);
                    // console.log(`Exam code and id present: ${examObject.code} - ${examObject.id}`);
                    Swal.fire('Exam Started', '', 'success');
                    this.route.navigate(['userexam', examObject.code]);
                  }
                }
                });
            } else {
              Swal.fire('You already attempted exam', '', 'error');
            }
          });
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
