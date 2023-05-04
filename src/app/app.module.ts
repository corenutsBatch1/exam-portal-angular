import { AdminSidenavComponent } from './components/admin-homepage/admin-sidenav/admin-sidenav.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app.routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { LoginmodalComponent } from './components/loginmodal/loginmodal.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserResultComponent } from './components/admin-homepage/admin-sidenav/user-result/user-result.component';
import { MatTableModule } from '@angular/material/table'  ;
import { MatInputModule } from '@angular/material/input';
import { QuestionBankComponent } from './components/admin-homepage/admin-sidenav/question-bank/question-bank.component';
import { AddquestionComponent } from './components/admin-homepage/admin-sidenav/question-bank/addquestion/addquestion.component';
import {MatSelectModule} from '@angular/material/select';
import { SettingsComponent } from './components/admin-homepage/admin-sidenav/Settings/Settings.component';
import { AddSubjectComponent } from './components/admin-homepage/admin-sidenav/Settings/AddSubject/AddSubject.component';
import { ManageQuestionComponent } from './components/admin-homepage/admin-sidenav/question-bank/manageQuestion/manageQuestion.component';
import { CreatePaperComponent } from './components/admin-homepage/admin-sidenav/createPaper/createPaper.component';
import { AddPaperComponent } from './components/admin-homepage/admin-sidenav/createPaper/addPaper/addPaper.component';
import { ScheduleExamComponent } from './components/admin-homepage/admin-sidenav/schedule-exam/schedule-exam.component';
import { AddExamComponent } from './components/admin-homepage/admin-sidenav/schedule-exam/add-exam/add-exam.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ViewPaperComponent } from './components/admin-homepage/admin-sidenav/createPaper/viewPaper/viewPaper.component';
import { UserHomepageComponent } from './components/user-homepage/user-homepage.component';
import { UserSidenavComponent } from './components/user-homepage/user-sidenav/user-sidenav.component';
import { ProfileComponent } from './components/user-homepage/user-sidenav/profile/profile.component';
import { CodeComponent } from './components/user-homepage/user-sidenav/code/code.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserexamComponent } from './components/user-homepage/user-sidenav/code/userexam/userexam.component';
import { UserAnswersComponent } from './components/user-homepage/user-sidenav/code/userexam/userAnswers/userAnswers.component';
import { AddCodingQuestionComponent } from './components/admin-homepage/admin-sidenav/question-bank/add-coding-question/add-coding-question.component';
import { CodingComponent } from './components/user-homepage/user-sidenav/code/userexam/coding/coding.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsersComponent } from './components/admin-homepage/admin-sidenav/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginmodalComponent,
    SignupComponent,
    AdminHomepageComponent,
    AdminSidenavComponent,
    AdminSidenavComponent,
    UserResultComponent,
    QuestionBankComponent,
    AddquestionComponent,
    SettingsComponent,
    AddSubjectComponent,
    ManageQuestionComponent,
    CreatePaperComponent,
    AddPaperComponent,
    ScheduleExamComponent,
    AddExamComponent,
    ForgotPasswordComponent,
    ViewPaperComponent,
    UserHomepageComponent,
    UserSidenavComponent,
    ProfileComponent,
    CodeComponent,
    UserexamComponent,
    UserAnswersComponent,
    AddCodingQuestionComponent,
    CodingComponent,
    UsersComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CodemirrorModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
 // bootstrap: [ ... ],
})
export class AppModule {}
