import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';



const MINUTES_UNITL_AUTO_LOGOUT = 10; // in Minutes
const CHECK_INTERVALL = 6000; // in ms
// const STORE_KEY = 'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AutoLogoutServiceService {


  last: number;


  constructor(private auth: AuthService, private router: Router,
    private ngZone: NgZone) {
    this.check();
    this.initListener();
    this.initInterval();
  }


  // get lastAction() {
  //   return parseInt(localStorage.getItem(STORE_KEY), 2);
  // }

  // set lastAction(value) {
  //   // localStorage.set(STORE_KEY, value);
  //   localStorage.setItem(STORE_KEY, value.toString());
  // }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      // document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('click', () => this.last = Date.now());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    })
  }

  // reset() {
  //   this.lastAction = Date.now();
  // }

  check() {
    const now = Date.now();
    // const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const timeleft = this.last + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    //console.log('diff' + diff);



    this.ngZone.run(() => {
      if (isTimeout && this.auth.isLoggedIn()) {
        console.log(`Sie wurden automatisch nach ${MINUTES_UNITL_AUTO_LOGOUT} Minuten Inaktivität ausgeloggt.`);
        this.auth.logOut();
        this.router.navigate(['login']);
      }
    });
  }

  timeRemained() {
    const now = Date.now();
    const timeleft = this.last + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const df = timeleft - now;
    return { df };
  }



}


