import { Subject } from "./Subject";

export class Question{
  id?:any;
  content?:string;
  optionA?:string;
  optionB?:string;
  optionC?:string;
  optionD?:string;
  answer?:string;
  qtype?:string;
  subject?:Subject

}
