import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8000/api/register';
  currentUser = new BehaviorSubject(false);

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient) { }

  register(values: any): Observable<boolean> {
    return this.http.post<boolean>(this.url, values, this.httpOptions);
  }


}
