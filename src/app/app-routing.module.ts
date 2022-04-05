import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentComponent} from "./department/department.component";
import {FruitComponent} from "./fruit/fruit.component";
import {DepartmentItemComponent} from "./department/department-item/department-item.component";
import {MaritalStatusComponent} from "./marital_status/marital-status.component";
import {MaritalStatusItemComponent} from "./marital_status/marital-status-item/marital-status-item.component";

const routes: Routes = [
  {path: "fruit", component: FruitComponent},
  {path: "department", component: DepartmentComponent},
  {path: "department/:action", component: DepartmentItemComponent},
  {path: "marital_status", component: MaritalStatusComponent},
  {path: "marital_status/:action", component: MaritalStatusItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
