import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FilltersComponent } from './components/fillters/fillters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material resource
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableComponent,
    LoadingComponent,
    FilltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
