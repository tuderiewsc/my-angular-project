import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleModel } from 'src/app/models/article.model';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent implements OnInit {

  categories: CategoryModel[];
  query: string;
  Articles: ArticleModel[];
  expanded = false;
  // @Output() passedPhrase = new EventEmitter<string>();



  constructor(private api: ApiService, private auth: AuthService
    , private router: Router) { }

  ngOnInit() {

    $(document).ready(function () {
      $('a').click(function (event) {
        event.preventDefault();
      });

    });

    this.api.getCategories()
      .subscribe(res => this.categories = res);


  }

  expand(status: boolean) {
    console.log(status);
    this.expanded = !this.expanded;
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
