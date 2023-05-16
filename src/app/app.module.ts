import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'  ;
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IndividualUserResultComponent } from './components/user-homepage/user-sidenav/individual-user-result/individual-user-result.component';
@NgModule({
  declarations: [
    routingComponents,
    IndividualUserResultComponent
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
    CKEditorModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
 // bootstrap: [ ... ],
})
export class AppModule {}
