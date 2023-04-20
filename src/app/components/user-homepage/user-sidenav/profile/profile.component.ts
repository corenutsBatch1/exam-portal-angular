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
  constructor(private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {

this.route.paramMap.subscribe(params=>{
  const id2=params.get('id2');
  console.log(id2);
  this.user.id= parseInt(id2 ?? '0',10); //using 0 as default value if id2 is null
  console.log(this.user.id+"userid");
  this.http.post(`http://localhost:8088/api/getUserById`,this.user).subscribe(data=>{
    console.log(data);
    this.user2=data;
    console.log(this.user2)
  })

})
  }

}
