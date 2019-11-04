import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {


  // @Input() passedArticle: ArticleModel;
  passedArticle: ArticleModel;
  errorMessage: string;


  constructor(private route: ActivatedRoute,
    private router: Router, private api: ApiService) { }


  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const id = +this.route.snapshot.params.id;
    this.api.getArticle(id).
      subscribe(article => this.passedArticle = article);
  }


}
