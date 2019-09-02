import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Stats } from '../add-article/add-article.component';

export interface Stats {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  stats: Stats[] = [
    { value: false, viewValue: '---' },
    { value: true, viewValue: 'منتشر شده' },
    { value: false, viewValue: 'منتشر نشده' }
  ];


  articletitle: string;
  articledesc: string;
  articleimage: string;
  articlesubmitted: boolean;
  article: ArticleModel;


  constructor(private route: ActivatedRoute, private router: Router,
    private articleservice: ArticlesService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.getArticle(id);
  }

  getArticle(id) {
    this.articleservice.getArticle(id).
      subscribe(article => this.article = article);
  }

  onSaveArticle() {
    if (this.articletitle) { this.article.title = this.articletitle; }
    if (this.articledesc) { this.article.desc = this.articledesc; }
    if (this.articleimage) { this.article.image = '/assets/images/slide1.jpg'; }
    if (this.articlesubmitted) { this.article.submitted = this.articlesubmitted; }

    this.articleservice.updatearticles(this.article).
      subscribe(() => this.router.navigate(['/article/' + this.article.id]));
  }






}
