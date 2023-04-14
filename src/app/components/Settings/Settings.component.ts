import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}
  loadAddSubjectPage() {
    this.show = false;
    this.route.navigate(['adminpage/settings/addsubject']);
  }
  show: boolean = true;
}
