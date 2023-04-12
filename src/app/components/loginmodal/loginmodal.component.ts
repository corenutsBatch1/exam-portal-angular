import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from './../model/User';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
  userLogin:User = new User();
  constructor(private http:HttpClient) {}

  login(user:User){
    console.log(user)
    this.http.post(`http://localhost:8080/loginUser`, user).subscribe(data => console.log(data))
  }
}
