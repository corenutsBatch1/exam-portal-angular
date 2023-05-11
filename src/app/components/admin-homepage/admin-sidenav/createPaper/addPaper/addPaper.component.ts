
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CodingQuestion } from 'src/app/model/model/CodingQuestion';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import { Question } from 'src/app/model/model/Question';
import { Subject } from 'src/app/model/model/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-addPaper',
  templateUrl: './addPaper.component.html',
  styleUrls: ['./addPaper.component.css']
})
export class AddPaperComponent implements OnInit {
  @Output('loadAddPaperpage') loadAddPaperpage = new EventEmitter();
  constructor(private http :HttpClient) { }
  createPaper=new CreatePaper();
  subjects?:Subject[];
  questionsIdArray:number[]=[];

  codingQuestionsIdArray:number[]=[];

  isDisabled:boolean=false;

  question123?:Question[];
  codingQuestion?:CodingQuestion[];
  uniqueSubjectNames?:string[];
  subjectControl = new FormControl();
  subject_id?:number;
  selectedsubject?:string;
  filteredTopics: Subject[] = [];
  papers:CreatePaper[]=[];
  show:boolean=false;
  questionCount = 0;
  noOfQuestions?:number;
  name:string='';
  questionsLeft?:number;
  ngOnInit(): void {

    this.http.get<Subject[]>(`http://localhost:8089/api/getAllSubjects`).subscribe(data=>{
      console.log(data);
       this.subjects=data;
       console.log(this.subjects);
       console.log("---------------")
      this.uniqueSubjectNames= this.getUniqueSubjectNames(this.subjects);
    })
    const noOfQuestionsInput = document.getElementById('noOfQuestions') as HTMLInputElement;
      const noOfQuestionsError = document.getElementById('noOfQuestionsError') as HTMLElement;
      const totalMarksInput = document.getElementById('totalMarks') as HTMLInputElement;
      const totalMarksError = document.getElementById('totalMarksError') as HTMLElement;

      noOfQuestionsInput.addEventListener('input', (event) => {
        const inputElement = event.target as HTMLInputElement;
        const numQuestions = inputElement.value;
        if (!isNaN(Number(numQuestions))) {
          inputElement.classList.remove('is-invalid');
          noOfQuestionsError.style.display = 'none';
        } else {
          inputElement.classList.add('is-invalid');
          noOfQuestionsError.style.display = 'block';
        }
      });

      totalMarksInput.addEventListener('input', (event) => {
        const inputElement = event.target as HTMLInputElement;
        const totalMarks = inputElement.value;
        if (!isNaN(Number(totalMarks))) {
          inputElement.classList.remove('is-invalid');
          totalMarksError.style.display = 'none';
        } else {
          inputElement.classList.add('is-invalid');
          totalMarksError.style.display = 'block';
        }
      });
  }
  allFieldsFilled = false;

  checkAllFieldsFilled() {
    if (
      this.createPaper.name &&
      this.createPaper.numberOfQuestions &&
      this.createPaper.totalMarks &&
      this.selectedsubject &&
      this.subject_id &&
      this.questionsIdArray.length >= 0

    ) {
      console.log("-------------------------")
      this.allFieldsFilled = true;
    } else {
      // console.log("-------------------------")
      this.allFieldsFilled = false;
    }
  }

  getUniqueSubjectNames(subjects: Subject[]): string[] {
    console.log("---pppppppppppppp")
    console.log(subjects)
    const uniqueSubjectNames = subjects
      .map((subject) => subject?.name)
      .filter((name) => name !== undefined) as string[];
    return [...new Set(uniqueSubjectNames)];
  }

   onSubjectSelection() {
    //const value = event.value;
    if (this.selectedsubject) {
      console.log("==============")
      // Filter topics based on selected subject
      console.log(this.selectedsubject)
      console.log(this.subjects)
      this.filteredTopics = this.subjects!.filter((t) => t.name === this.selectedsubject);

    } else {
     // this.filteredTopics = undefined;
    }
  }
  getquestions(id:any)
  {
    if(this.selectedsubject != 'CODING'){
      this.http.get<Question[]>(`http://localhost:8089/api/getallquestions/${id}`).subscribe(data=>{
      console.log(data);
        this.question123=data;
             })
    }else{
      this.http
      .get<CodingQuestion[]>(`http://localhost:8089/api/fetchcodingquestions`)
      .subscribe((data) => {
        console.log(data);
        this.codingQuestion = data;
        console.log(this.codingQuestion);
      });
    }

  }

addpaper(createPaper:CreatePaper)
{
  createPaper.questionsListArray=this.questionsIdArray;
  createPaper.codingQuestionsListArray=this.codingQuestionsIdArray
  if (this.noOfQuestions && this.questionCount < this.noOfQuestions){
    this.questionsLeft=this.noOfQuestions-this.questionCount;
    swal("You have to add "+this.questionsLeft+" more .", "", "error");
  }else{
    this.http.post<CreatePaper>(`http://localhost:8089/api/addpaper`,createPaper).subscribe(
      data=>{

      swal("Paper created successfully","", "success");
    this.goBack();
  },
    error=>{
      swal("All field must be required","", "error");
    }

    );
  }

}
// addquestions(questionId?:number)
//   {
//     console.log(questionId)
//     if (this.noOfQuestions&& questionId && this.questionCount < this.noOfQuestions) {
//       console.log("question id is not --null")
//       this. questionsIdArray =  this.questionsIdArray.concat(questionId);
//       this.questionCount++;
//     }
//     else {
//       alert('You have reached the maximum number of questions.');
//     }
//       console.log(this.questionsIdArray);

//   }
goBack() {
  console.log(this.loadAddPaperpage)
     this.loadAddPaperpage.emit(true);
     console.log(this.loadAddPaperpage)
    //  location.reload();

     }
checkboxChanged(event: any, optionValue?: number, subjectName?:string) {

      if (event.checked) {
        // Checkbox is checked

        if (this.noOfQuestions && this.questionCount < this.noOfQuestions) {

         if(subjectName?.toLowerCase()===('coding')){

         this.codingQuestionsIdArray.push(optionValue as number);
          this.questionCount++;
          console.log(this.codingQuestionsIdArray)
         }else{
          this.questionsIdArray.push(optionValue as number);
          console.log(this.questionsIdArray)
          this.questionCount++;
        }
        } else {
          setTimeout(() => {
            swal("You have reached the maximum number of questions.", "", "error");
            // alert('You have reached the maximum number of questions.');
            event.source.checked = false;
          }, 0);
        }
      } else {
        // Checkbox is unchecked
        const index = this.questionsIdArray.indexOf(optionValue as number);
        if (index !== -1) {
          this.questionsIdArray.splice(index, 1);
          console.log(this.questionsIdArray)
          this.questionCount--;
        }
      }
    }





    }



