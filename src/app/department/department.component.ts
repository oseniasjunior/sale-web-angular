import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../models/department";
import {BaseListComponent} from "../base-list.component";
import {URLS} from "../utils/urls";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends BaseListComponent<Department> implements OnInit, OnDestroy {
  public displayedColumns = ["id", "name", "modified_at", "active", "actions"];

  constructor(public override injector: Injector) {
    super(injector, {endpoint: URLS.DEPARTMENT});
    this.mainService.title.next("DEPARTAMENTOS");
  }

}
