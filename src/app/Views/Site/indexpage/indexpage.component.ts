import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/Models/category.model';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { AuthService } from 'src/app/Controllers/services/auth.service';
import { ArticleModel } from 'src/app/Models/article.model';
import {ActivatedRoute, Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import * as $ from 'jquery';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent implements OnInit {

  categories: CategoryModel[];
  Articles: ArticleModel[];
  // @Output() passedPhrase = new EventEmitter<string>();
  loaded : boolean = false;


  constructor(private api: ApiService, private auth: AuthService
              ,private activeroute:ActivatedRoute, private titleService: Title
  ) {

    this.titleService.setTitle(activeroute.snapshot.data['title']);

    // this.router.events.subscribe((routerEvent: Event) => {
    //   this.checkRouterEvent(routerEvent);
    // })
  }

  // checkRouterEvent(routerEvent: Event){
  //   if (routerEvent instanceof NavigationStart){
  //     this.loading = true;
  //   }
  //   if (routerEvent instanceof NavigationEnd ||
  //     routerEvent instanceof NavigationCancel ||
  //     routerEvent instanceof NavigationError){
  //     this.loading = false;
  //   }
  // }

  ngOnInit() {

    $(document).ready(function () {
      $('a').click(function (event) {
        event.preventDefault();
      });
    });

    this.api.getCategories().subscribe(res => this.categories = res);
  }





}
