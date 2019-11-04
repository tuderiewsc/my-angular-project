import { Component, OnInit, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  // @Input() passedPhrase: string;
  Articles: ArticleModel[];
  query: string;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const queryPhrase = this.route.snapshot.params.query;
    this.query = queryPhrase;

    this.api.getsearchArticle(queryPhrase)
      .subscribe(res => this.Articles = res);
  }

  onSearch(event: string) {
    this.api.getsearchArticle(event)
      .subscribe(res => {
        console.log(res),
          this.Articles = res;
      });

    console.log('2:' + event);


  }



}
