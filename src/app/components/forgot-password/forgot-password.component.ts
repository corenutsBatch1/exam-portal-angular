import { LoginserviceService } from './../loginmodal/loginservice.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/model/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  user: User = new User();



  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  resetpassword(user:User) {
    const resetUrl = 'http://localhost:8088/api/forgotpassword';
    console.log(user.password);
    this.http.put(resetUrl,user).subscribe(data => {
      console.log(user.password);
      console.log(data);
    });


  }














//   user:User = new User();
//   constructor(private http:HttpClient,private router: Router,
//     private loginservice: LoginserviceService
//   ) {}
//   resetpassword(user: User) {
//    // console.log("===========================");
//     const reseturl=`http://localhost:8080/edituser`
//    return  this.http
//       .put(reseturl).subscribe(data=>{
//         console.log("=================")


//       })
// }

}
