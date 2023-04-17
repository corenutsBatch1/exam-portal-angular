import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginmodalComponent } from './components/loginmodal/loginmodal.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminSidenavComponent } from './components/admin-homepage/admin-sidenav/admin-sidenav.component';
import { UserResultComponent } from './components/user-result/user-result.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { SettingsComponent } from './components/Settings/Settings.component';
import { AddSubjectComponent } from './components/AddSubject/AddSubject.component';
import { AuthGuard } from './components/loginmodal/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      { path: 'login', component: LoginmodalComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'adminpage',
        component: AdminHomepageComponent,
        canActivate: [AuthGuard],
        children: [
          {path:'home',component:HomeComponent},
          { path: 'result', component: UserResultComponent },
          {
            path: 'questionbank',component: QuestionBankComponent,
            children: [
              { path: 'addquestions', component: AddquestionComponent },
            ],
          },
          {path:'settings',component:SettingsComponent,
          children: [
            { path: 'addsubject', component: AddSubjectComponent },
          ],
        },


        ],
      },

      { path: 'adminsidenav', component: AdminSidenavComponent },
      { path: '**', redirectTo: 'login' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
