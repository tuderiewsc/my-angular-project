import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Constants } from '../../Constants';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(false);
  loggedIn = false;

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };


  constructor(private http: HttpClient , private cookieservice:CookieService , private api:ApiService) {
    this.currentUser.next(this.getUser());
  }

  register(values: any): Observable<boolean> {
    return this.http.post<boolean>(Constants.regUrl, values, this.httpOptions);
  }

  login(values: any): Observable<any> {
    return this.http.post<any>(Constants.loginUrl, values, this.httpOptions);
  }


  localStoragegetItem(value: string) {
    return localStorage.getItem(value);
  }

  getUser() {
    return this.cookieservice.get(Constants.AuthCookie) ? true : false;
    // return this.localStoragegetItem('user')
    // ? JSON.parse(this.localStoragegetItem('user')) : false;
  }

  isLoggedIn() {
    this.loggedIn = this.cookieservice.get(Constants.AuthCookie) ? true : false;

    const authenticate = new Promise(
      (resolve) => {
        resolve(this.loggedIn);
      }
      );
    return authenticate;
  }

  isGuest(): boolean {
    return this.cookieservice.get(Constants.AuthCookie) ? false : true;
  }

  logOut() {
    this.cookieservice.delete(Constants.AuthCookie);
    this.currentUser.next(false);
  }


}
