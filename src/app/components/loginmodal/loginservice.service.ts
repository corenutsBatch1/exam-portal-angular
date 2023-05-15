import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    })
    .then((result) => {
      if (result.isConfirmed) {
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
