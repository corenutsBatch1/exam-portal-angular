import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginmodalComponent } from './components/loginmodal/loginmodal.component';
@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, SidenavComponent, LoginmodalComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
  MatToolbarModule, MatIconModule,
MatSidenavModule,
MatListModule,MatIconModule,
MatButtonModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
