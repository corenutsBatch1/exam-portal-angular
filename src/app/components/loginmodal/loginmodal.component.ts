import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/model/User';
import { LoginserviceService } from './loginservice.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
    //Form variables
loginForm:any = FormGroup;
submitted = false;

  userLogin:User = new User();
  validUser?:User;
  constructor(private http:HttpClient,private router: Router,
     private loginservice: LoginserviceService,private formBuilder:FormBuilder
     ) {}

     //Add user form actions
get f()
{ return this.loginForm.controls; }

ngOnInit() {
  //Add User form validations
  this.loginForm = this.formBuilder.group({
  lemail: ['', [Validators.required, Validators.email]],
  lpassword: ['', [Validators.required,Validators.minLength(6)]]
  });
}

  login(user: User) {
  this.submitted = true;
    console.log(user);
    if (this.loginForm.invalid) {
      console.log("false");
      return;
    }
    if(this.submitted)
     {
    this.http
      .post(`http://localhost:8088/api/loginUser`, user)
      .subscribe((data) => {
        this.validUser = data;
        if (this.validUser != null) {
          if (this.validUser.role == 'ADMIN') {
            this.loginservice.login()
            // this.loginservice.isLoggedIn = true;
            this.router.navigate(['/adminpage']);
          } else if (this.validUser.role == 'USER') {
            this.loginservice.login()
            // this.loginservice.isLoggedIn = true;
            this.router.navigate(['/userpage']);
          }
        } else {
          sweetAlert("Invalid Credentials", "Register and try again", "error");
        }
     });
    }
   }
}
