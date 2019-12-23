import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/Models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { PagerService } from 'src/app/Controllers/services/pager.services';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/Controllers/services/auth.service';
import { DeleteDialogComponent } from 'src/app/Views/dialog/delete-dialog/delete-dialog.component';
import * as $ from 'jquery';


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

  constructor(private api: ApiService, private authservice: AuthService,
    private snackbar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit() {
    $(document).ready(function () {
      $('div.menu_bar').click(function (event) {
        if ($(this).find('label.menu').attr('checked') != 'checked') {
          $(this).find('label.menu').attr('checked', 'true');
          $('nav.navigation').animate({ right: '0' }, 'fast');
          $('ul.menu').removeClass('hidden').animate({ width: '100%' }, 'fast');
          $('section.panel_content').css({
            'margin-right': '22%',
            'width': '76%'
          });
        } else {
          $(this).find('label.menu').removeAttr('checked');
          $('nav.navigation').animate({ right: '-20%' }, 'fast');
          $('ul.submenu').addClass('hidden').css('height', '0');
          $('section.panel_content').css({
            'margin-right': '0%',
            'width': '100%'
          });
        }
      });
    });

    this.getArticles();
    this.complete = 1;
    this.keyword = '';
  }

  getArticles() {
    this.user = this.authservice.getUser();
    const userId = this.user.id;

    this.api.getArticlesList(userId).subscribe(articles => {
      this.articles = articles
        //console.log('articles= ' + this.articles)
    });
  }


  del(id: number, title: string) {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '348px',
      data: { entityName: 'پاک کردن', message: `پاک شود؟ ${title} مفاله` }
    });
    dialog.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this.api.deleteArticle(id)
          .subscribe(() => location.reload());
        this.openSnackbar();
      }
    });

    // if(confirm('مقاله پاک شود؟')){
    //   // do action
    // }
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
