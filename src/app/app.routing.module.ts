import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginmodalComponent } from "./components/loginmodal/loginmodal.component";


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginmodalComponent},
      { path: 'signup', component: SignupComponent},
      { path: '**', redirectTo: 'home' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
