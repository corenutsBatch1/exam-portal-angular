import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../model/model/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signUpForm:any=FormGroup;
  submitted = false;

  data:any | undefined;
  userLogin:User = new User();
  constructor(private http:HttpClient, private router : Router,
    private formBuilder:FormBuilder){}

  get f()
  {
   return this.signUpForm.controls;
  }

ngOnInit(){
  //Add User form validations
  this.signUpForm = this.formBuilder.group({
  sname:
  [
    '',
   [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z ]*')
   ]
 ],
  semail:
  [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],
  spassword:
  [
    '',
    [
      Validators.required,
      Validators.minLength(6)
    ]
  ],
  sphoneNumber:
  [
    '',
    [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
      // Validators.minLength(10),
      // Validators.maxLength(10)
    ]
  ],
  });
}



registerNewUser(newUser:User){
this.submitted = true;
console.log(newUser);
if (this.signUpForm.invalid) {
  console.log("false");
  return;
}
if(this.submitted)
{
    this.http.post(`http://localhost:8088/api/registerUser`, newUser).subscribe(data=> {
      if(data !=null){
        swal("Registered successfully", "", "success");
      }
      else{
        swal("Already have an Account", "", "error");
      }
    });
  }
}
}
