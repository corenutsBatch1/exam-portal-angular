import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  isLoggedIn = false;
  constructor() {
    this.isLoggedIn = !!localStorage.getItem('is_logged_in');
  }

  login() {
    localStorage.setItem('is_logged_in', 'true');
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('is_logged_in');
    this.isLoggedIn = false;
  }
}
