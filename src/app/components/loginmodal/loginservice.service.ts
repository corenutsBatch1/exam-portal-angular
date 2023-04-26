import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  isLoggedIn = false;
  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('is_logged_in');
  }

  login() {
    localStorage.setItem('is_logged_in', 'true');
    this.isLoggedIn = true;
  }

  logout() {
    const logOutConfirmed = confirm("are you want logout!!!");
    if(logOutConfirmed){
    localStorage.removeItem('is_logged_in');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    }else{
      localStorage.setItem('is_logged_in', 'true');
      this.isLoggedIn = true;
    }
  }
}
