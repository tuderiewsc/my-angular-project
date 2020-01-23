import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from 'src/app/Models/article.model';
import { ApiService } from 'src/app/Controllers/services/api.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {map} from 'rxjs/operators';
import {query} from '@angular/animations';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  // @Input() passedPhrase: string;
  Articles: ArticleModel[];
  query: string;
  noResult:boolean = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.pipe
    (map((params: Params) => params.query))
      .subscribe(query => this.api.getsearchArticle(query)
        .subscribe(res => {
          if(res == 0){
            this.Articles = null;
          }else {
          this.Articles = res;
          }
          console.log('articles: ' + this.Articles)
        }));

    this.route.params.pipe
    (map((params: Params) => params.query))
      .subscribe(query => this.query=query);


    // this.query = this.route.snapshot.params.query;
    // this.api.getsearchArticle(this.query)
    //   .subscribe(res => this.Articles = res);
  }




}
