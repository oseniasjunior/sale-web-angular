import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentService} from "../../../services/department.service";
import {Department} from "../../../models/department";
import {Subject, takeUntil} from "rxjs";
import {Utils} from "../../utils/utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent implements OnInit, OnDestroy {
  public department = new Department();
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;

  constructor(private service: DepartmentService, public router: Router) {

  }

  ngOnInit(): void {
  }

  public save(): void {
    this.service.save(this.department).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => {
      console.log(response);
      this.navigate('department', this.router);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
