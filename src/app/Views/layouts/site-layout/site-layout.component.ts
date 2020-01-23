import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../Models/category.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../Controllers/services/auth.service';
import {AutoLogoutServiceService} from '../../../Controllers/services/auto-logout-service.service';
import {ApiService} from '../../../Controllers/services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  title = 'articles_project';
  loggedIn = false;
  categories: CategoryModel[];
  query: string;
  pageType: string;
  loaded: boolean =false;


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
    $(document).ready(function () {
      $('form#main_search').find('button').click(function(event) {
        $('form#main_search').find('input').focus();
        var searchText = $('form#main_search').find('input').val();
        var inputWidth = $('form#main_search').find('input').width();
        if (searchText == '' && innerWidth == 0) {
          event.preventDefault();
        }else{
          if (inputWidth == 0) {
            event.preventDefault();
            $('form#main_search').find('input').animate({width:'250px'}, 300).css('background', '#eee');
            $(this).css('background', '#009688');
          }
        }
      });

      $('form#main_search').find('input').focusout(function(event) {
        setInterval(function(){
          var hasFocus = $('form#main_search').find('input').is(":focus");
          var inputWidth = $('form#main_search').find('input').width();
          if (inputWidth != 0 && !hasFocus) {
            $('form#main_search').find('input').animate({width:'0'}, 300)
              .css('background', 'transparent').val('');
            $('form#main_search').find('button').css('background', 'transparent');
          }
        } ,8000);
      });
    });

    this.api.getCategories()
      .subscribe(res => {
        this.categories = res,
          this.loaded =true
      });

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
