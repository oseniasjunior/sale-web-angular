import {Component, OnDestroy, OnInit} from '@angular/core';
import {Department} from "../../../models/department";
import {map, Subject, take, takeUntil} from "rxjs";
import {Utils} from "../../utils/utils";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BaseService} from "../../../services/base.service";
import {MainService} from "../../../services/main.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-marital-status-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss']
})
export class DepartmentItemComponent implements OnInit, OnDestroy {
  public aObject = new Department();
  public unsubscribe = new Subject();
  public navigate = Utils.navigate;
  public group!: FormGroup;

  constructor(private service: BaseService<Department>,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public mainService: MainService,
              public fb: FormBuilder) {
    this.mainService.title.next("CADASTRO / EDIÇÃO DE DEPARTAMENTO");
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.getParameters();
    this.onChangeName();
  }


  public createFormGroup(): void {
    this.group = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]]
    });
  }

  public onChangeName(): void {
    this.group.controls["name"].valueChanges.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(value => {
      if (value === "ozzy") {
        this.group.removeControl('age');
      } else {
        this.group.addControl('age', new FormControl(null, [Validators.required]))
      }
      this.group.clearValidators();
      this.group.updateValueAndValidity();
    });
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
    console.log(this.group.getRawValue());
    Object.assign(this.aObject, this.group.getRawValue());
    if (this.aObject.id) {
      this.service.update(this.aObject, this.aObject.id, "department/").pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('department', this.router));
    } else {
      this.service.save(this.aObject, "department").pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(response => this.navigate('department', this.router));
    }
  }

  public getById(id: number): void {
    this.service.getById(id, "department/").pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => {
      this.aObject = response;
      this.group.reset(this.aObject);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
