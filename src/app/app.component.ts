import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AutoLogoutServiceService } from './services/auto-logout-service.service';
import { MatDialog } from '@angular/material';
import { PagerService } from './services/pager.services';
import { ApiService } from './services/api.service';
import { CategoryModel } from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  title = 'articles_project';
  loggedIn = false;
  tr: number;
  categories: CategoryModel[];
  query: string;



  constructor(private router: Router, private auth: AuthService,
    private authLogout: AutoLogoutServiceService, private api: ApiService) {
  }



  checkLogin(): boolean {
    if (this.auth.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.tr = this.authLogout.timeRemained().df;

    this.api.getCategories()
      .subscribe(res => this.categories = res);

  }

  logout() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
    return false;
  }

  searchArticle() {
    this.router.navigate(['search/' + this.query]);
    // this.passedPhrase.emit(this.phrase);

    // this.api.getsearchArticle(this.phrase)
    //   .subscribe(res => {
    //     console.log(res),
    //       this.passedArticles.emit(res),
    //       this.router.navigateByUrl('searchResult');
    //   });

  }






}

