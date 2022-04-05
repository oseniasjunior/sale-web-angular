import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "../services/main.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = "";
  public unsubscribe = new Subject();

  constructor(public mainService: MainService) {

  }

  ngOnInit(): void {
    this.onChange();
  }

  public onChange(): void {
    this.mainService.title.pipe(takeUntil(this.unsubscribe)).subscribe(title => this.title = title);
  }


  ngOnDestroy(): void {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }

}
