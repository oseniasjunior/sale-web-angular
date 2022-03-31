import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Department {
  id: number;
  name: string;
  created_at: Date;
  modified_at: Date;
  active: boolean;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentList: Department[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(): void {
    this.http.get<Department[]>("http://127.0.0.1:8000/sale/core/department/")
      .subscribe((response) => {
        this.departmentList = response;
      });
  }

}
