import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { trigger, transition } from '@angular/animations';
import { slideAnimation } from './articles/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [trigger('routerAnimation', [
    transition('*=>*', slideAnimation)
  ])]
})
export class AppComponent {


  title = 'articles_project';


  prepareRouteTransition(outlet) {
    const animation = outlet.activatedRouteData.animation || {};
    return animation.value || null;
  }



  constructor(private authservice: AuthService, private router: Router) { }

  login() {
    if (this.authservice.loggedIn === false) {
      this.authservice.logIn();
    } else {
      this.authservice.logOut();
      this.router.navigate(['/home']);
    }
  }

  isAdmin(): boolean {
    return this.authservice.loggedIn;
  }




}

