// import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/model/model/User';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   user: User = new User();
//   constructor(
//     private http: HttpClient,
//     private router: Router,
//   ) { }
//   resetpassword(user:User) {
//     const resetUrl = 'http://localhost:8088/api/forgotpassword';
//     console.log(user.password);
//     this.http.put(resetUrl,user).subscribe(data => {
//       console.log(user.password);
//       console.log(data);
//     });

//   }
// }
// --------------------------------------------------------------------


import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../model/model/User';
// import { LoginserviceService } from './loginservice.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';


@Component({
     selector: 'app-forgot-password',
     templateUrl: './forgot-password.component.html',
     styleUrls: ['./forgot-password.component.css']
   })


export class ForgotPasswordComponent {
hide = true;
//Form variables
resetForm:any = FormGroup;
submitted = false;
userReset:User = new User();
validUser?:User;
id?:number;

constructor(private http:HttpClient,private router: Router,
   private formBuilder:FormBuilder
     ) {}

//Add user form actions
get f()
{ return this.resetForm.controls; }

ngOnInit() {
  //Add User form validations
  this.resetForm = this.formBuilder.group({
    remail: ['', [Validators.required, Validators.email]],
    rpassword: ['', [Validators.required,Validators.minLength(6),Validators.pattern( /^\S*$/)]]
  });
}

resetpassword(user: User) {
  this.submitted = true;

  // if validation failed
    if (this.resetForm.invalid) {
      console.log("false");
      return;
    }

    if(this.submitted){
   console.log(this.userReset.password);
    this.http
      .put(`http://localhost:8088/api/forgotpassword`, user)
      .subscribe((data) => {

        if (data == true  ) {
          sweetAlert("Password changed sucessfully!!", "Now,login with new password", "sucess");

        } else {
          sweetAlert("Invalid Credentials", "Register and try again", "error");
        }
     });
    }
   }
}
