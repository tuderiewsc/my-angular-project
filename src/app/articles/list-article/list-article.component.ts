import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PagerService } from 'src/app/services/pager.services';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';


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
  user: any;

  constructor(private activateroute: ActivatedRoute,
    private router: Router, private api: ApiService, private authservice: AuthService,
    private pagerservice: PagerService, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getArticles();
    this.complete = 1;
    this.keyword = '';

    if (this.articles) {
      console.log('ok');
    } else {
      console.log('Notok');
    }
  }

  getArticles() {
    // const id = +this.route.snapshot.params.id;
    this.user = this.authservice.getUser();
    const userId = this.user.id;
    this.api.getArticlesList(userId).subscribe(articles => this.articles = articles);

  }


  del(id: number) {
    this.api.deleteArticle(id)
      .subscribe(() => location.reload());

    this.openSnackbar();
  }

  openSnackbar() {
    this.snackbar.open('حذف موفقیت آمیز', '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
    });
  }


}
