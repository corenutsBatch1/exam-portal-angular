import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyserviceService } from 'src/app/model/myservice';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {

  @Input() id?:any;
  userId?:number;
  constructor(private router:Router,private route:ActivatedRoute,private service:MyserviceService) { }

  ngOnInit() {
    this.userId=this.id;
    this.service.userid(this.userId);

  }
  clickEvent(name:any,event:any){
    console.log(name);
    if(name==='profile'){
      console.log("-------")
      const userid=event.currentTarget.id;
      console.log(userid)
      this.route.paramMap.subscribe(params=>{
        const id1=params.get('id');
        console.log(id1)
        this.router.navigate(['userpage',id1,'profile',{id2:userid}]);
      })

    }

  }
  clickExam(name:any){
    console.log(name);
    if(name=='code'){
      this.router.navigate(['userpage/:id/code']);

  }

}
}
