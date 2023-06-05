
import { Component, HostListener } from '@angular/core';
import { LoginserviceService } from './components/loginmodal/loginservice.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'exam-portal-ui';
  constructor(private loginService : LoginserviceService){

  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    localStorage.removeItem('is_logged_in');
    localStorage.clear();
    this.loginService.isLoggedIn = false

  }
}
