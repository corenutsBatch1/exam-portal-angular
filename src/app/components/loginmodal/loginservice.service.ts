import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

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
    swal({
      title: "Are you sure you want to logout?",
      icon: "warning",
      buttons: ['Cancel', 'Yes, logout'],
      dangerMode: true,
    })
    .then((logOutConfirmed) => {
      if (logOutConfirmed) {
        localStorage.removeItem('is_logged_in');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      } else {
        localStorage.setItem('is_logged_in', 'true');
        this.isLoggedIn = true;
      }
    });
}
}
