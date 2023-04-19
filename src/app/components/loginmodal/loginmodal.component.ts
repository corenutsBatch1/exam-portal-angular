import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/model/User';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
  userLogin:User = new User();
  validUser?:User;
  constructor(private http:HttpClient,private router: Router,
     private loginservice: LoginserviceService,
     ) {}

  login(user: User) {
    console.log(user);
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
