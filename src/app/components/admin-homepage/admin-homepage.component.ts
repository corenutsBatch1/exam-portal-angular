import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../loginmodal/loginservice.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor(private service : LoginserviceService){}
  ngOnInit(): void {
    this.service.isResultPage = false
  }
}
