import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../model/model/User';
import { LoginserviceService } from './loginservice.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
hide = true;
//Form variables
loginForm:any = FormGroup;
submitted = false;
userLogin:User = new User();
validUser?:User;
id?:number;

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
  lpassword: ['', [Validators.required,Validators.minLength(6),Validators.pattern( /^\S*$/)]]
  });
}

login(user: User) {
  this.submitted = true;

  // if validation failed
    if (this.loginForm.invalid) {
      console.log("false");
      return;
    }

    if(this.submitted){

    this.http
      .post(`http://localhost:8088/api/loginUser`, user)
      .subscribe((data) => {
        this.validUser = data;
        if (this.validUser != null ) {
          if (this.validUser.role == 'ADMIN') {
            this.loginservice.login()
            // this.loginservice.isLoggedIn = true;
            this.router.navigate(['/adminpage']);
          } else if (this.validUser.role == 'USER') {
            this.loginservice.login()
            // this.loginservice.isLoggedIn = true;
            this.id=this.validUser.id;
            this.router.navigate(['/userpage',this.id]);
            console.log(this.id);
          }
        } else {
          
          Swal.fire({
            title: "Invalid Credentials",
            text: "Register and try again",
            icon: "error",
            // Additional configuration options...
          });

        }
     });
    }
   }
}
