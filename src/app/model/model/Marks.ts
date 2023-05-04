import { ScheduleExam } from "./ScheduleExam";
import { User } from "./User";

export class Marks{
  id?:number;
  totalMarks?:number;
  marks?:number;
  user?:User;
  exam?:ScheduleExam;
  serialNumber?:number;
  examCode?:string;
  name?:string;
  obtainedMarks?:number;
}
