import { Injectable } from '@angular/core';
import {promise} from 'selenium-webdriver';
import {resolve} from 'url';
import {reject} from 'q';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }
  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
        (resolve) => {
          resolve(this.loggedIn);
        }
    );
    return isUserAdmin;
  }

}
