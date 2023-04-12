import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><app-sidenav></app-sidenav><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'exam-portal-ui';
}
