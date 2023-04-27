import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/model/Subject';
import swal from 'sweetalert';

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
    this.submitted=true;
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


//add Category info
addSubjectInfo()
{
  console.log(this.myForm);
  this.http.post<any>('http://localhost:8089/api/addsubject',this.myForm.value).subscribe(
    response=>{
      swal("Subject added successfully","", "success");
      this.goBack();
    }
  );
}

goBack(){
this.loadAddSubjectPage.emit(true);
}

}


