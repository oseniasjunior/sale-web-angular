import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentService} from "../../../services/department.service";
import {Department} from "../../../models/department";
import {map, Subject, take, takeUntil} from "rxjs";
import {Utils} from "../../utils/utils";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent implements OnInit, OnDestroy {
  public department = new Department();
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;

  constructor(private service: DepartmentService, public router: Router, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getParameters();
  }

  public getParameters(): void {
    this.activatedRoute.params.pipe(
      take(1),
      takeUntil(this.unsubscribe),
      map((params: Params) => params["action"])
    ).subscribe(value => {
      if (value !== "new") {
        this.getById(Number(value));
      }
    });
  }

  public save(): void {
    if (this.department.id) {
      this.service.update(this.department, this.department.id).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('department', this.router));
    } else {
      this.service.save(this.department).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('department', this.router));
    }
  }

  public getById(id: number): void {
    this.service.getById(id).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.department = response);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
