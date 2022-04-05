import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../../models/department";
import {map, Subject, take, takeUntil} from "rxjs";
import {Utils} from "../../utils/utils";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BaseService} from "../../../services/base.service";
import {MaritalStatus} from "../../../models/marital-status";

@Component({
  selector: 'app-marital-status-item',
  templateUrl: './marital-status-item.component.html',
  styleUrls: ['./marital-status-item.component.scss']
})
export class MaritalStatusItemComponent implements OnInit, OnDestroy {
  public aObject = new MaritalStatus();
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;
  public path = "marital_status/";

  constructor(private service: BaseService<MaritalStatus>, public router: Router, public activatedRoute: ActivatedRoute) {

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
    if (this.aObject.id) {
      this.service.update(this.aObject, this.aObject.id, this.path).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('marital_status', this.router));
    } else {
      this.service.save(this.aObject, this.path).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('marital_status', this.router));
    }
  }

  public getById(id: number): void {
    this.service.getById(id, this.path).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.aObject = response);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
