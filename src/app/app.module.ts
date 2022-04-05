import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {DepartmentComponent} from './department/department.component';
import {FruitComponent} from './fruit/fruit.component';
import {HttpClientModule} from "@angular/common/http";
import {DepartmentItemComponent} from "./department/department-item/department-item.component";
import {BaseService} from "../services/base.service";
import {MaritalStatusComponent} from "./marital_status/marital-status.component";
import {MaritalStatusItemComponent} from "./marital_status/marital-status-item/marital-status-item.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    FruitComponent,
    DepartmentComponent,
    DepartmentItemComponent,
    MaritalStatusComponent,
    MaritalStatusItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    BaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
