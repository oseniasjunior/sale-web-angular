import {Injectable} from "@angular/core";
import {Department} from "../models/department";
import {HttpClient} from "@angular/common/http";
import {catchError, from, Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class BaseService<T> {

  private readonly baseUrl = "http://127.0.0.1:8000/sale/core/";

  constructor(private http: HttpClient) {

  }

  public getAll(path: string): Observable<T[]> {
    const fullUrl = `${this.baseUrl}${path}/`;
    return this.http.get<T[]>(fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public getById(id: number, path: string): Observable<T> {
    const fullUrl = `${this.baseUrl}${path}${id}/`;
    return this.http.get<T>(fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public save(aObject: T, path: string): Observable<T> {
    const fullUrl = `${this.baseUrl}${path}/`;
    return this.http.post<T>(fullUrl, aObject).pipe(
      catchError(() => from([]))
    );
  }

  public update(aObject: T | {}, id: number, path: string): Observable<T> {
    const fullUrl = `${this.baseUrl}${path}${id}/`;
    return this.http.patch<T>(fullUrl, aObject).pipe(
      catchError(() => from([]))
    );
  }

}
