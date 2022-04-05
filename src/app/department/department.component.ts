import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../models/department";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Utils} from "../utils/utils";
import {BaseService} from "../../services/base.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  public departmentList: Department[] = [];
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;
  public path = "department";

  constructor(private service: BaseService<Department>, public router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(): void {
    this.service.getAll(this.path).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.departmentList = response);
  }

  public edit(id: number): void {
    this.navigate(`department/${id}`, this.router);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
