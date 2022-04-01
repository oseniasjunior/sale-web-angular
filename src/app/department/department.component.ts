import {Component, OnInit} from '@angular/core';
import {DepartmentService} from "../../services/department.service";

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

  constructor(private service: DepartmentService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(): void {
    this.service.getAll().subscribe(response => this.departmentList = response);
  }

}
