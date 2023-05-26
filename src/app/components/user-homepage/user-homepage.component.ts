import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
// import { User } from 'src/app/model/model/User';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {
id1?:number;
elem: any;
  constructor(@Inject(DOCUMENT) private document: any, private route:ActivatedRoute) {

  }

  ngOnInit() {
    this.id1=this.route.snapshot.params['id'];
    console.log(this.id1);
    this.elem = document.documentElement;
    this.openFullscreen()
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }


  // right Click disable
  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

}
