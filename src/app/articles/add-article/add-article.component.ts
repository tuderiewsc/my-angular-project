import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';


export interface Stats {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addArticleForm: FormGroup;

  stats: Stats[] = [
    { value: false, viewValue: '---' },
    { value: true, viewValue: 'منتشر شده' },
    { value: false, viewValue: 'منتشر نشده' }
  ];

  title: string;
  desc: string;
  image: string;
  submitted: boolean;
  fileToUpload: File = null;



  // @Output() newArticle = new EventEmitter<ArticleModel>();


  constructor(private articleservice: ArticlesService, private router: Router,
    private formbuilder: FormBuilder, private snackbar: MatSnackBar,
    private http: HttpClient) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.addArticleForm = this.formbuilder.group({
      title: ['', Validators.required],
      desc: ['', [
        Validators.maxLength(20),
        Validators.required
      ]],
      submitted: ['', Validators.required],
      image: ['', Validators.required]
    });
  }







  onsubmit() {




    const Article = new ArticleModel();

    Article.id = Math.floor(Math.random() * 100);
    Article.title = this.title;
    // Article.image = this.image;
    Article.image = '/assets/images/slide1.jpg';
    Article.desc = this.desc;
    Article.createdat = Date.now();
    if (this.submitted === true) {
      Article.submitted = true;
    } else {
      Article.submitted = false;
    }







    this.articleservice.addArticles(Article).
      subscribe(() => this.router.navigate(['/home']));

    this.openSnackbar();
  }

  openSnackbar() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive'
      // announcementMessage: 'test msg'
    });
    throw new Error('Method not implemented.');
  }

}
