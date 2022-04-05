import {Injectable} from "@angular/core";
import {Department} from "../models/department";
import {HttpClient} from "@angular/common/http";
import {catchError, from, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class DepartmentService {

  private readonly baseUrl = "http://127.0.0.1:8000/sale/core/";
  private readonly path = "department";
  private readonly fullUrl: string;

  constructor(private http: HttpClient) {
    this.fullUrl = `${this.baseUrl}${this.path}/`;
  }

  public getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public getById(id: number): Observable<Department> {
    const fullUrl = `${this.fullUrl}${id}/`;
    return this.http.get<Department>(fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public save(department: Department): Observable<Department> {
    return this.http.post<Department>(this.fullUrl, department).pipe(
      catchError(() => from([]))
    );
  }

  public update(department: Department | {}, id: number): Observable<Department> {
    const fullUrl = `${this.fullUrl}${id}/`;
    return this.http.patch<Department>(fullUrl, department).pipe(
      catchError(() => from([]))
    );
  }

}
