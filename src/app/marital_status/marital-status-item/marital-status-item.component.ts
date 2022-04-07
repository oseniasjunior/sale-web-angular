import {Component, Injector} from '@angular/core';
import {MaritalStatus} from "../../../models/marital-status";
import {BaseCreateOrUpdateComponent} from "../../base-create-or-update.component";
import {URLS} from "../../utils/urls";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-marital-status-item',
  templateUrl: './marital-status-item.component.html',
  styleUrls: ['./marital-status-item.component.scss']
})
export class MaritalStatusItemComponent extends BaseCreateOrUpdateComponent<MaritalStatus> {
  override item = new MaritalStatus();

  constructor(public override injector: Injector) {
    super(injector, {endpoint: URLS.MARITAL_STATUS, nextPage: "marital_status"});
    this.mainService.title.next("CADASTRO / EDIÇÃO DE ESTADO CIVIL");
  }

  createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

}
