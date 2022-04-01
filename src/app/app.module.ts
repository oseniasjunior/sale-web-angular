import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {DepartmentComponent} from './department/department.component';
import {FruitComponent} from './fruit/fruit.component';
import {HttpClientModule} from "@angular/common/http";
import {DepartmentService} from "../services/department.service";
import {DepartmentItemComponent} from "./department/department-item/department-item.component";

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    FruitComponent,
    DepartmentItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    DepartmentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
