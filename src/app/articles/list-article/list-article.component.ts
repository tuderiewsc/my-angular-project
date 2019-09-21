import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticleModel } from 'src/app/models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  articles: ArticleModel[];
  passedArticle: ArticleModel;
  complete: boolean;
  keyword: string;

  constructor(private articlesService: ArticlesService, private route: ActivatedRoute,
    private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.getArticles();
    this.complete = true;
    this.keyword = '';


    // this.passedArticle = this.route.snapshot.data.resolveData.resolvedarticle;
    // if (this.passedArticle != null) { this.onDelete(); }
  }

  getArticles() {
    const id = +this.route.snapshot.params.id;
    this.api.getArticles(id).subscribe(articles => this.articles = articles.data);
  }


  del(id: number) {
    // this.articlesService.getArticle(id).
    //   subscribe(article => this.articlesService.deleteArticle(article).
    //     subscribe(() => this.router.navigate(['/home'])));


    this.api.getArticle(id).
      subscribe(article => this.articlesService.deleteArticle(article).
        subscribe(() => this.router.navigate(['/home'])));
  }


}
