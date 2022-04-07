import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {MaritalStatus} from "../../models/marital-status";
import {BaseListComponent} from "../base-list.component";
import {URLS} from "../utils/urls";

@Component({
  selector: 'app-marital-status',
  templateUrl: './marital-status.component.html',
  styleUrls: ['./marital-status.component.scss']
})
export class MaritalStatusComponent extends BaseListComponent<MaritalStatus> implements OnInit, OnDestroy {

  public displayedColumns = ["id", "name", "modified_at", "active", "actions"];

  constructor(public override injector: Injector) {
    super(injector, {endpoint: URLS.MARITAL_STATUS});
    this.mainService.title.next("ESTADO CIVIL");
  }

}
