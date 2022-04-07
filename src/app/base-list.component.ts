import {Directive, InjectionToken, Injector, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";
import {BaseService} from "../services/base.service";
import {MainService} from "../services/main.service";
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

interface Options {
  endpoint: string;
}

@Directive()
export class BaseListComponent<T> implements OnInit, OnDestroy {
  items: T[] = [];
  unsubscribe = new Subject<void>();
  service!: BaseService<T>;
  mainService: MainService;
  http: HttpClient;
  router: Router;
  toast: ToastrService;

  protected constructor(public injector: Injector, public options: Options) {
    this.mainService = injector.get(MainService);
    this.http = injector.get(HttpClient);
    this.router = injector.get(Router);
    this.toast = injector.get(ToastrService);
    this.service = injector.get(this.getServiceToken());
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getServiceToken(): InjectionToken<BaseService<T>> {
    return new InjectionToken<BaseService<T>>("service_" + this.options.endpoint, {
      providedIn: "root", factory: () => new BaseService<T>(this.http, this.options.endpoint)
    });
  }

  public goToPage(path: string): void {
    const extras: NavigationExtras = {queryParamsHandling: "merge"};
    this.router.navigate([path], extras).then();
  }

  public getAll(): void {
    this.service.getAll().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(response => this.items = response);
  }

  public activeOrInactive(id: number, active: boolean): void {
    this.service.update({"active": !active}, id).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => this.toast.success("Alterado com sucesso", "Sucesso"));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
