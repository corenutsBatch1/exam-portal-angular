import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../../model/model/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  data:any | undefined;
  userLogin:User = new User();
  constructor(private http:HttpClient, private router : Router){}

  registerNewUser(newUser:User){
    console.log(newUser)
    this.http.post(`http://localhost:8080/api/registerUser`, newUser).subscribe(data=> {
      if(data !=null){
        swal("Registered successfully", "", "success");
        this.router.navigate(['/login']);
      }
    });
  }
}
