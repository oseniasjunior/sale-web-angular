import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../models/department";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Utils} from "../utils/utils";
import {BaseService} from "../../services/base.service";
import {MaritalStatus} from "../../models/marital-status";

@Component({
  selector: 'app-department',
  templateUrl: './marital-status.component.html',
  styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent implements OnInit, OnDestroy {
  public items: MaritalStatus[] = [];
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;
  public path = "marital_status";

  constructor(private service: BaseService<MaritalStatus>, public router: Router) {
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
    this.navigate(`marital_status/${id}`, this.router);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
