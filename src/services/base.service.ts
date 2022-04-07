import {HttpClient} from "@angular/common/http";
import {catchError, from, Observable} from "rxjs";


export class BaseService<T> {

  private readonly baseUrl = "http://127.0.0.1:8000/sale/core/";

  constructor(private http: HttpClient, private path: string) {

  }

  public getAll(): Observable<T[]> {
    const fullUrl = `${this.baseUrl}${this.path}`;
    return this.http.get<T[]>(fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public getById(id: number): Observable<T> {
    const fullUrl = `${this.baseUrl}${this.path}${id}/`;
    return this.http.get<T>(fullUrl).pipe(
      catchError(() => from([]))
    );
  }

  public save(aObject: T): Observable<T> {
    const fullUrl = `${this.baseUrl}${this.path}`;
    return this.http.post<T>(fullUrl, aObject).pipe(
      catchError(() => from([]))
    );
  }

  public update(aObject: T | {}, id: number): Observable<T> {
    const fullUrl = `${this.baseUrl}${this.path}${id}/`;
    return this.http.patch<T>(fullUrl, aObject).pipe(
      catchError(() => from([]))
    );
  }

}
