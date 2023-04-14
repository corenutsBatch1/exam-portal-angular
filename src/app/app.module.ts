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
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginmodalComponent } from './components/loginmodal/loginmodal.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserResultComponent } from './components/user-result/user-result.component';
import { MatTableModule } from '@angular/material/table'  ;
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    LoginmodalComponent,
    SignupComponent,
    AdminHomepageComponent,
    AdminSidenavComponent,
    AdminSidenavComponent,
    UserResultComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
