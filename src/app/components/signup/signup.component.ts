import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../model/model/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  hide=true;
  hidec=true;
  signUpForm:any= FormGroup;
  submitted = false;

  data: any | undefined;
  userLogin: User = new User();

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // Add User form validations
    this.signUpForm = this.formBuilder.group({
      sname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*')
        ]
      ],
      semail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern( /^\S*$/),
        ]
      ],
      spassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern( /^\S*$/),
        ]
      ],
      scpassword: [
        '',
        [
          Validators.required,
        ]
      ],
      sphoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$'),
          // Validators.minLength(10),
          // Validators.maxLength(10)
        ]
      ],
    }, {
      validator: this.passwordMatchValidator('spassword', 'scpassword') // Add custom validator
    });
  }

  // Custom validator function to check if password and confirm password match
  passwordMatchValidator(passwordField: string, confirmPasswordField: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordField];
      let confirmPassword = group.controls[confirmPasswordField];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
    };
  }

  // Getter for easy access to form fields in template
  get f() {
    return this.signUpForm.controls;
  }

  registerNewUser(newUser: User) {
    this.submitted = true;
    console.log(newUser);
    if (this.signUpForm.invalid) {
      console.log("false");
      return;
    }
    if (this.submitted) {
      this.http.post(`http://localhost:9032/api/registerUser`, newUser).subscribe(data => {
        if (data != null) {
          Swal.fire({
            title: "Registered successfully",
            text: 'User Name is ' + this.userLogin.email,
            icon: "success",
            // Additional configuration options...
          });
          this.router.navigateByUrl('/login');
        } else {

          Swal.fire({
            title: "Already have an Account",
            text: "",
            icon: "error",
            // Additional configuration options...
          });
        }
      });
    }
  }
}
