import { Component, OnInit, Inject } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { articleStatsToken } from 'src/app/providers/article.provider';



@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {



  articletitle: string;
  articledesc: string;
  articleimage: string;
  articlesubmitted: boolean;
  article: ArticleModel;


  constructor(private route: ActivatedRoute, private router: Router,
    private articleservice: ArticlesService, @Inject(articleStatsToken) public stats) { }

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
