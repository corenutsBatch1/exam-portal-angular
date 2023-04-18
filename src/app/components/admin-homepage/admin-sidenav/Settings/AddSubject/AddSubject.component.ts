import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/model/Subject';

@Component({
  selector: 'app-AddSubject',
  templateUrl: './AddSubject.component.html',
  styleUrls: ['./AddSubject.component.css']
})
export class AddSubjectComponent implements OnInit {

@Output("loadAddSubjectPage") loadAddSubjectPage=new EventEmitter
Subjects:Subject = new Subject();
myForm: FormGroup= new FormGroup({});
  constructor(private http:HttpClient, private router:Router,private fb:FormBuilder) {
    this.createSubject();
   }

  createSubject() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    description:['', Validators.required],
  });
}



  ngOnInit() {


  }
  onSubmit(){
    this.addSubjectInfo();
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
  this.http.post<any>('http://localhost:8088/api/addsubject',this.myForm.value).subscribe(
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


