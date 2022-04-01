import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/department";
import {Subject, takeUntil} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {Utils} from "../utils/utils";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  public departmentList: Department[] = [];
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;

  constructor(private service: DepartmentService, public router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(): void {
    this.service.getAll().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.departmentList = response);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
