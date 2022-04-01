import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentComponent} from "./department/department.component";
import {FruitComponent} from "./fruit/fruit.component";
import {DepartmentItemComponent} from "./department/department-item/department-item.component";

const routes: Routes = [
  {path: "fruit", component: FruitComponent},
  {path: "department", component: DepartmentComponent},
  {path: "department/:action", component: DepartmentItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
