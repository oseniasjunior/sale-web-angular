import {Component, Injector} from '@angular/core';
import {Department} from "../../../models/department";
import {takeUntil} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {BaseCreateOrUpdateComponent} from "../../base-create-or-update.component";
import {URLS} from "../../utils/urls";

@Component({
  selector: 'app-marital-status-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent extends BaseCreateOrUpdateComponent<Department> {
  public override item = new Department();

  constructor(public override injector: Injector) {
    super(injector, {endpoint: URLS.DEPARTMENT, nextPage: "department"});
    this.mainService.title.next("CADASTRO / EDIÇÃO DE DEPARTAMENTO");
  }

  override ngOnInit() {
    super.ngOnInit();
    this.onChangeName();
  }

  public createFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]]
    });
  }

  public onChangeName(): void {
    this.formGroup.controls["name"].valueChanges.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(value => {
      if (value === "ozzy") {
        this.formGroup.removeControl('age');
      } else {
        this.formGroup.addControl('age', new FormControl(null, [Validators.required]))
      }
      this.formGroup.clearValidators();
      this.formGroup.updateValueAndValidity();
    });
  }


}
