import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss']
})
export class FruitComponent implements OnInit {
  //@ts-ignore
  @Input() newFruit: string;
  fruit: string = "";
  fruits: string[] = [];

  ngOnInit(): void {
    //@ts-ignore
    this.fruit = this.newFruit;
  }

  public addFruit(): void {
    this.fruits.push(this.fruit);
    this.fruit = "";
  }

  public removeFruit(index: number): void {
    this.fruits.splice(index, 1);
  }

}
