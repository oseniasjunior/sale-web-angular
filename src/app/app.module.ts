import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartmentComponent} from './department/department.component';
import {FruitComponent} from './fruit/fruit.component';
import {HttpClientModule} from "@angular/common/http";
import {DepartmentItemComponent} from "./department/department-item/department-item.component";
import {MaritalStatusComponent} from "./marital_status/marital-status.component";
import {MaritalStatusItemComponent} from "./marital_status/marital-status-item/marital-status-item.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MainService} from "../services/main.service";
import {ToastrModule} from "ngx-toastr";

export const TOAST_OPTIONS = {
  positionClass: "toast-top-right",
  timeOut: 5000,
  progressBar: true,
  tapToDismiss: true,
  preventDuplicates: true,
};

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
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    FlexModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(TOAST_OPTIONS),
  ],
  providers: [
    MainService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
