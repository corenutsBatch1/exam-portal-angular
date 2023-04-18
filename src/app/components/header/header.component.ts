import { Component } from '@angular/core';
import { LoginserviceService } from './../loginmodal/loginservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public loginservice : LoginserviceService){}

  logOut(){
    localStorage.removeItem('is_logged_in');
    this.loginservice.logout();
    // this.loginservice.isLoggedIn = false;
  }
}



// sweetAlert({
//   title: "Are you sure?",
//   text: "Once logOut, you will not be able to ",
//   icon: "warning",
//   buttons: [
//     'No, cancel it!',
//     'Yes, I am sure!'
//   ],
//   dangerMode: true,
// })
// .then(
//   function () { /*Your Code Here*/ },
//   function () { return false; }
// );

