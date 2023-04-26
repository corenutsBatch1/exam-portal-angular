import { Component } from '@angular/core';
import { LoginserviceService } from './../loginmodal/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(public loginservice : LoginserviceService,public router: Router){}
  logOut(){
    localStorage.removeItem('is_logged_in');
    localStorage.clear();
    this.loginservice.logout();
  }
}
