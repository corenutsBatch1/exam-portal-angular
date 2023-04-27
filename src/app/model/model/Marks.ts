import { ScheduleExam } from "./ScheduleExam";
import { User } from "./User";

export class Marks{
  id?:number;
  totalMarks?:number;
  marks?:number;
  user?:User;
  exam?:ScheduleExam;
}
