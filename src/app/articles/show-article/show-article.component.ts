import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
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


  constructor(private articlesService: ArticlesService, private route: ActivatedRoute,
    private router: Router, private authservice: AuthService,
    private api: ApiService) { }


  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const id = +this.route.snapshot.params.id;
    this.api.getArticle(id).
      subscribe(article => this.passedArticle = article);

    // this.passedArticle = this.route.snapshot.data.resolveData.resolvedarticle;
    // this.errorMessage = this.route.snapshot.data.resolveData.error;
    // console.log(this.errorMessage);
  }
  onDelete() {
    this.articlesService.deleteArticle(this.passedArticle).
      subscribe(res => console.log(res));
    // this.passedArticle= null;
    this.router.navigate(['/home']);
  }
  onEdit() {
    this.router.navigate(['/article', this.passedArticle.id, 'edit'],
      { queryParams: { title: this.passedArticle.title }, fragment: 'editing' });
  }
  isAdmin(): boolean {
    return this.authservice.loggedIn;
  }
}
