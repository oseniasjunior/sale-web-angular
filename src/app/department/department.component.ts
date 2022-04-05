import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../models/department";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Utils} from "../utils/utils";
import {BaseService} from "../../services/base.service";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, OnDestroy {
  public items: Department[] = [];
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;
  public path = "department";
  public displayedColumns = ["id", "name", "modified_at", "active", "actions"];

  constructor(private service: BaseService<Department>, public router: Router, public mainService: MainService) {
    this.mainService.title.next("LISTA DE DEPARTAMENTO");
  }

  ngOnInit(): void {
    this.getAll();
  }


  public getAll(): void {
    this.service.getAll(this.path).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.items = response);
  }

  public edit(id: number): void {
    this.navigate(`department/${id}`, this.router);
  }

  public activeOrInactive(id: number, active: boolean): void {
    this.service.update({"active": !active}, id, "department/").pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => console.log("sucesso"));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
