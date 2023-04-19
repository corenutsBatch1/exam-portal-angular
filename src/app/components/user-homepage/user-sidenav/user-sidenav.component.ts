import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  clickEvent(name:any){
    console.log(name);
    if(name=='code'){
      this.router.navigateByUrl("userpage/code");

    }
    if(name=='profile'){
      this.router.navigateByUrl("userpage/profile");
    }

  }

}
