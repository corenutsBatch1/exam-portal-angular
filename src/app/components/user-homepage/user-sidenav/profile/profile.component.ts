import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User=new User();
  user2:User=new User();
  user3:User=new User();
  id:any;
  isEditMode?:boolean;
  constructor(private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {

this.route.paramMap.subscribe(params=>{
  const id2=params.get('id2');
  this.id=id2;
  console.log(id2);
  this.user.id= parseInt(id2 ?? '0',10); //using 0 as default value if id2 is null
  console.log(this.user.id+"userid");
  this.http.get(`http://54.64.6.102:9032/api/getUserById/${id2}`).subscribe(data=>{
    console.log(data);
    this.user2=data;
    this.user3.name=this.user2.name;
    this.user3.email=this.user2.email;
    this.user3.phoneNumber=this.user2.phoneNumber;

    console.log(this.user2)
  })

})
  }


  updateprofile()
{
  this.user3.id=this.id;
    this.http.post(`http://54.64.6.102:9032/api/updateUser`,this.user3).subscribe(data=>{console.log(data)
    this.ngOnInit();
  })
}

enableEditMode(){
  this.isEditMode = true;
}

disableEditMode(){
  this.isEditMode = false;
}
}
