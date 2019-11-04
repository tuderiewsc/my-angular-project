import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleModel } from 'src/app/models/article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent implements OnInit {

  categories: CategoryModel[];
  query: string;
  Articles: ArticleModel[];
  // @Output() passedPhrase = new EventEmitter<string>();



  constructor(private api: ApiService, private auth: AuthService
    , private router: Router) { }

  ngOnInit() {
    this.api.getCategories()
      .subscribe(res => this.categories = res);
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
