import { ScheduleExam } from "./ScheduleExam";
import { User } from "./User";


export class UserExamDetails
{
  id?:number;
  loginTime?:any;
  logoutTime?:any
  exam?:ScheduleExam;
  user?:User;
  examDuration?:number
  status?:string
}
