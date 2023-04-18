import { Question } from "./Question";

export class Exam{
  id?:number;
  name?:string;
  totalMarks?:string;
  numberOfQuestions?:string;
  questions?:Question[];
}
