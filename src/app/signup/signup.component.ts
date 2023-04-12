import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import swal from 'sweetalert';
import { User } from '../components/model/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  data:any | undefined;
  userLogin:User = new User();
  constructor(private http:HttpClient){}

  registerNewUser(newUser:User){
    console.log(newUser)
    this.http.post(`http://localhost:8080/registerUser`, newUser).subscribe(data=> this.data = data);
    swal("Good job!", "Registered successfully", "success");
  }
}
