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
      catchError(ex => from([]))
    );
  }

}
