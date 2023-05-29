import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from './../loginmodal/loginservice.service';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/model/myservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoginPage: boolean = false;

  constructor(public loginservice : LoginserviceService, public router: Router,
    private service : MyserviceService){}

  ngOnInit() {
    this.isLoginPage = this.router.url === '/login';
  }

  logOut(){
    localStorage.removeItem('is_logged_in');
    localStorage.clear();
    this.loginservice.logout();
  }

  goBack(){
    this.router.navigate(['userpage/' + this.service.uid])
  }

}

