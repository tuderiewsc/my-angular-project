import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PagerService } from 'src/app/services/pager.services';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  articles: ArticleModel[];
  passedArticle: ArticleModel;
  complete: number;
  keyword: string;

  constructor(private activateroute: ActivatedRoute,
    private router: Router, private api: ApiService,
    private pagerservice: PagerService) { }

  ngOnInit() {
    this.getArticles();
    this.complete = 1;
    this.keyword = '';
  }

  getArticles() {
    //const id = +this.route.snapshot.params.id;
    this.api.getArticlesList().subscribe(articles => this.articles = articles);
  }


  del(id: number) {

    // this.api.getArticle(id).
    // subscribe(article => this.articlesService.deleteArticle(article).
    //   subscribe(() => this.router.navigate(['/home'])));
  }


}
