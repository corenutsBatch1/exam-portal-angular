import { CodingQuestion } from "./CodingQuestion";
import { ScheduleExam } from "./ScheduleExam";
import { User } from "./User";

export class UserCode
{
  id?:number;
  language?:string;
  code?:Uint8Array;
  userInputCode?:string;
  user?:User
  exam?:ScheduleExam;
  codingQuestion?:CodingQuestion
  iscorrect?:String;

}
