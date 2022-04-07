import {Directive, InjectionToken, Injector, OnDestroy, OnInit} from "@angular/core";
import {map, Subject, take, takeUntil} from "rxjs";
import {BaseService} from "../services/base.service";
import {MainService} from "../services/main.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationExtras, Params, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";

interface Options {
  endpoint: string;
  nextPage?: string;
}

@Directive()
export abstract class BaseCreateOrUpdateComponent<T> implements OnInit, OnDestroy {
  item: T | any;
  unsubscribe = new Subject<void>();
  service!: BaseService<T>;
  mainService: MainService;
  http: HttpClient;
  router: Router;
  toast: ToastrService;
  activatedRoute: ActivatedRoute;
  formBuilder: FormBuilder;
  formGroup!: FormGroup;
  pk!: number;

  protected constructor(public injector: Injector, public options: Options) {
    this.mainService = injector.get(MainService);
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
    this.toast = injector.get(ToastrService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.formBuilder = injector.get(FormBuilder);
    this.service = injector.get(this.getServiceToken());
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.retrieve();
  }

  abstract createFormGroup(): void;

  private getServiceToken(): InjectionToken<BaseService<T>> {
    return new InjectionToken<BaseService<T>>("service_" + this.options.endpoint, {
      providedIn: "root", factory: () => new BaseService<T>(this.http, this.options.endpoint)
    });
  }

  public goToPage(path: string): void {
    const extras: NavigationExtras = {queryParamsHandling: "merge"};
    this.router.navigate([path], extras).then();
  }

  public saveOrUpdate(): void {
    Object.assign(this.item, this.formGroup.getRawValue());
    if (this.pk) {
      this.service.update(this.item, this.item["id"]).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(() => {
        if (this.options.nextPage) {
          this.goToPage(this.options.nextPage);
        }
      });
    } else {
      this.service.save(this.item).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(() => {
        if (this.options.nextPage) {
          this.goToPage(this.options.nextPage)
        }
      });
    }
  }


  public retrieve(): void {
    this.activatedRoute.params.pipe(
      take(1),
      takeUntil(this.unsubscribe),
      map((params: Params) => params["action"])
    ).subscribe(value => {
      if (value !== "new") {
        this.pk = Number(value)
        this.getById(this.pk);
      }
    });
  }


  public getById(id: number): void {
    this.service.getById(id).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => {
      this.item = response;
      this.formGroup.reset(this.item);
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
