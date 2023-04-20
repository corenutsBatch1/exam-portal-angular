import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/model/Subject';

@Component({
  selector: 'app-AddSubject',
  templateUrl: './AddSubject.component.html',
  styleUrls: ['./AddSubject.component.css']
})
export class AddSubjectComponent implements OnInit {
  myForm:any=FormGroup;
  submitted=false;

@Output("loadAddSubjectPage") loadAddSubjectPage=new EventEmitter
Subjects:Subject = new Subject();
  constructor(private http:HttpClient, private router:Router,private formbBuilder:FormBuilder) {}

  get f(){
   return this.myForm.controls;
  }

  ngOnInit() {
   this.myForm=this.formbBuilder.group({
    name: ['', Validators.required],
    description:['', Validators.required],
   });
  }

  onSubmit(){
    if (this.myForm.invalid) {
      console.log(this.myForm);
      console.log("false");
      return;
    }
    if(this.submitted)
     {
      console.log(this.myForm);
      this.addSubjectInfo();
     }
  }

  //add Subject info
//   addSubjectInfo(Subjects:Subject)
//   {
//     // console.log(this.createSubject);
//     this.http.post<any>('http://localhost:8088/api/addsubject',Subjects).subscribe(
//       response=>{
//        // console.log(response);
//         alert("Submited");
//         this.router.navigate(['adminpage']);
//       }
//     );
// }


//add Category info
addSubjectInfo()
{
  console.log(this.myForm);
  this.http.post<any>('http://localhost:8089/api/addsubject',this.myForm.value).subscribe(
    response=>{
      //console.log(response);
      alert("Submited");
      this.goBack();
    }
  );
}

goBack(){
this.loadAddSubjectPage.emit(true);
}

}


