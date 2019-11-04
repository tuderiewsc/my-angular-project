import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AutoLogoutServiceService } from './services/auto-logout-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  title = 'articles_project';
  loggedIn = false;


  constructor(private router: Router, private auth: AuthService,
    private authLogout: AutoLogoutServiceService) {
  }



  checkLogin(): boolean {
    if (this.auth.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
    return false;
  }




}

