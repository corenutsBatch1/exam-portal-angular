import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginmodalComponent } from './components/loginmodal/loginmodal.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminSidenavComponent } from './components/admin-homepage/admin-sidenav/admin-sidenav.component';
import { UserResultComponent } from './components/admin-homepage/admin-sidenav/user-result/user-result.component';
import { QuestionBankComponent } from './components/admin-homepage/admin-sidenav/question-bank/question-bank.component';
import { AddquestionComponent } from './components/admin-homepage/admin-sidenav/question-bank/addquestion/addquestion.component';
import { SettingsComponent } from './components/admin-homepage/admin-sidenav/Settings/Settings.component';
import { AddSubjectComponent } from './components/admin-homepage/admin-sidenav/Settings/AddSubject/AddSubject.component';
import { AuthGuard } from './components/loginmodal/auth-guard.service';
import { ManageQuestionComponent } from './components/admin-homepage/admin-sidenav/question-bank/manageQuestion/manageQuestion.component';
import { CreatePaperComponent } from './components/admin-homepage/admin-sidenav/createPaper/createPaper.component';
import { AddPaperComponent } from './components/admin-homepage/admin-sidenav/createPaper/addPaper/addPaper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      { path: 'login', component: LoginmodalComponent },
      { path: 'signup', component: SignupComponent },
      {path:'reset', component:ForgotPasswordComponent},
      {
        path: 'adminpage',
        component: AdminHomepageComponent,
        canActivate: [AuthGuard],
        children: [
          // {path:'home',component:HomeComponent},
          { path: 'result', component: UserResultComponent },
          {path:'createpaper',component:CreatePaperComponent,
          children: [
            { path: 'addpaper', component: AddPaperComponent },
          ],
        },
          {
            path: 'questionbank',component: QuestionBankComponent,
            children: [
              { path: 'addquestions', component: AddquestionComponent },
              {path:'managequestion',component:ManageQuestionComponent}
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
      { path: '**', redirectTo: 'home' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
