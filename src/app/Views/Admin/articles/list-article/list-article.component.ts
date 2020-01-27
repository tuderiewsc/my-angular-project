import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/Models/article.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { PagerService } from 'src/app/Controllers/services/pager.services';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/Controllers/services/auth.service';
import { DeleteDialogComponent } from 'src/app/Views/dialog/delete-dialog/delete-dialog.component';
import {count} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';


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
  ids = new Array();
  opsSelected:boolean = false;
  is_operating:boolean = false;
  no_complete_filter:boolean = true;
  ops_select:number = 0;


  constructor(private api: ApiService, private authservice: AuthService,
              private snackbar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getArticles();

    this.complete = 2;
    this.keyword = '';
  }

  showResults(value:number){
    if (value == 2){
      this.no_complete_filter = true;
    }else{
      this.no_complete_filter = false;
    }
  }

  getArticles() {
    this.user = this.authservice.getUser();
    const userId = this.user.id;

    this.api.getArticlesList(userId).subscribe(articles => {
      this.articles = articles
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

  }


  openSnackbar() {
    this.snackbar.open('حذف موفقیت آمیز', '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
    });
  }


  checkValue(id:number){
    if (this.ids.length>0){
      var counter = 0;
      this.ids.forEach((item, index) => {
        if (item === id){
          counter++;
          this.ids.splice(index,1);
        }
      });
      if (counter == 0){
        this.ids.push(id);
      }
    } else {
      this.ids.push(id);
    }
    console.log('ids: '+ this.ids);
  }

  opsChanged(){
    this.opsSelected=true;
  }


  ops_frmSubmit(){
    console.log(this.ops_select);
    if (this.ops_select == 0){
      alert('یک گزینه را انتخاب کنید');
    }else if (this.ops_select == 1){
      if (confirm('آیا مطمئنید؟')){
        this.is_operating = true;
        var nums = this.ids.length;
        var counter = 0;
        this.ids.forEach((item, index) => {
          this.api.deleteArticle(item)
            .subscribe( () => {
              location.reload()
            });
        });
        if (nums == counter){
          alert('تعداد' + nums + 'مقاله پاک شد.');
        }
      }
    } else if (this.ops_select == 2){
      const Article = new ArticleModel();
      Article.submitted = true;
      Article.title = '';
      Article.image = '';
      Article.desc = '';
      Article.category_id = 0;
      Article.user_id = 0;
      Article.image = '';
      //update article
      this.is_operating = true;
      var nums = this.ids.length;
      var counter = 0;
      this.ids.forEach((item, index) => {
        this.api.updateArticleStatus(Article, item)
          .subscribe(()=> {
              location.reload()
          });
        counter++;
      });
      console.log('counter: '+ counter);
      if (nums == counter){
        alert('وضعیت تعداد' + nums + 'مقاله ویرایش شد.');
      }

    }else if (this.ops_select == 3){
      const Article = new ArticleModel();
      Article.submitted = false;
      Article.title = '';
      Article.image = '';
      Article.desc = '';
      Article.category_id = 0;
      Article.user_id = 0;
      Article.image = '';
      //update article
      this.is_operating = true;
      var nums = this.ids.length;
      var counter = 0;
      this.ids.forEach((item, index) => {
        this.api.updateArticleStatus(Article, item)
          .subscribe(()=> {
            location.reload()
          });
        counter++;
      });
      console.log('counter: '+ counter);
      if (nums == counter){
        alert('وضعیت تعداد' + nums + 'مقاله ویرایش شد.');
      }
    }
  }


}
