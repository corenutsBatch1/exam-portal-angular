import { HomeComponent } from './components/home/home.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginmodalComponent } from "./components/loginmodal/loginmodal.component";
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminSidenavComponent } from './components/admin-homepage/admin-sidenav/admin-sidenav.component';
import { UserResultComponent } from './components/user-result/user-result.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginmodalComponent},
      { path: 'signup', component: SignupComponent},
      {path : 'adminpage', component : AdminHomepageComponent,
        children:[{path:"result",component: UserResultComponent}]
       },
      {path: 'adminsidenav', component: AdminSidenavComponent},
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}
