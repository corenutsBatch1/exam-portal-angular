import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../model/model/User';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css'],
})
export class LoginmodalComponent {
  userLogin:User = new User();
  validUser?:User;
  constructor(private http:HttpClient,private router: Router) {}

  login(user:User){
    console.log(user)
    this.http.post(`http://localhost:8080/loginUser`, user).subscribe(data => {
      this.validUser = data;
      console.log(this.validUser.role);
      if(this.validUser.role == "ADMIN"){
        this.router.navigate(['/adminpage']);
        history.pushState(null, '');
      }
    })
  }
}
