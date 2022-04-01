import {NavigationExtras, Router} from "@angular/router";

export class Utils {
  public static navigate(path: string, router: Router): void {
    const extras: NavigationExtras = {queryParamsHandling: "merge"};
    router.navigate([path], extras).then();
  }
}
