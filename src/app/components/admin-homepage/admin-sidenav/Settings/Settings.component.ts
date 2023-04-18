import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css'],
})
export class SettingsComponent implements OnInit {
  show: boolean = true;
  constructor(private route: Router) {}

  ngOnInit() {}
  loadAddSubjectPage(flag:boolean) {
    this.show = flag;
   // this.route.navigate(['adminpage/settings/addsubject']);
  }

}
