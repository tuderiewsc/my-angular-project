import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  regUrl = 'http://localhost:8000/api/register';
  loginUrl = 'http://localhost:8000/api/login';
  currentUser = new BehaviorSubject(false);
  loggedIn = false;

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient) {
    this.currentUser.next(this.getUser());
  }

  register(values: any): Observable<boolean> {
    return this.http.post<boolean>(this.regUrl, values, this.httpOptions);
  }

  login(values: any): Observable<boolean> {
    return this.http.post<boolean>(this.loginUrl, values, this.httpOptions);
  }

  localStoragegetItem(value: string) {
    return localStorage.getItem(value);
  }

  getUser() {
    //const user = localStorage.getItem('user');
    return this.localStoragegetItem('user')
      ? JSON.parse(this.localStoragegetItem('user')) : false;
  }

  isLoggedIn() {
    //  const user = localStorage.getItem('user');
    if (this.localStoragegetItem('user')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    const authenticate = new Promise(
      (resolve) => {
        resolve(this.loggedIn);
      }
    );
    return authenticate;
  }


  isGuest(): boolean {
    return !!this.getUser;
  }

  logOut() {
    localStorage.removeItem('user');
    this.currentUser.next(false);
  }


}
