import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../Models/category.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../Controllers/services/auth.service';
import {AutoLogoutServiceService} from '../../../Controllers/services/auto-logout-service.service';
import {ApiService} from '../../../Controllers/services/api.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  title = 'articles_project';
  loggedIn = false;
  tr: number;
  categories: CategoryModel[];
  query: string;
  pageType: string;



  constructor(private router: Router, private auth: AuthService,
              private authLogout: AutoLogoutServiceService, private api: ApiService
    ,private activatedroute: ActivatedRoute) {
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
