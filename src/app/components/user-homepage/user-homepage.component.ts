import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
// import { User } from 'src/app/model/model/User'; 

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
id1?:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.id1=this.route.snapshot.params['id'];
    console.log(this.id1);
  }

}
