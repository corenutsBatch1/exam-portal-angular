import { HomeComponent } from './components/home/home.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginmodalComponent } from "./components/loginmodal/loginmodal.component";
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginmodalComponent},
      { path: 'signup', component: SignupComponent},
      {path : 'adminpage', component : AdminHomepageComponent},
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
