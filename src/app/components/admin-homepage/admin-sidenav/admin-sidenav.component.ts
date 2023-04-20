import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent {
  constructor(private router:Router){}

  name:string='';
  value:string='';

  clickEvent(name:any){
    console.log(name);
    if(name=='result'){
      this.router.navigateByUrl("adminpage/result");

    }
    if(name=='questionbank'){
      this.router.navigateByUrl("adminpage/questionbank");
    }
    if(name=='settings'){
      this.router.navigateByUrl("adminpage/settings");
    }
    if(name=='createpaper'){
      this.router.navigateByUrl("adminpage/createpaper");
    }
    if(name=='scheduleexam'){
      this.router.navigateByUrl("adminpage/scheduleexam");
    }
  }






}
