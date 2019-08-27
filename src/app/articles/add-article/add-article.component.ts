import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';


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
  submitted: boolean;


  // @Output() newArticle = new EventEmitter<ArticleModel>();


  constructor(private articleservice: ArticlesService,
    private router: Router, private formbuilder: FormBuilder,
    private snackbar: MatSnackBar) {
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
    Article.image = '/assets/images/slide1.jpg';
    Article.desc = this.desc;
    Article.createdat = Date.now();
    if (this.submitted === true) {
      Article.submitted = true;
    } else {
      Article.submitted = false;
    }

    // const uploadData = new FormData();
    // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    // this.http.post('src/uploads/', uploadData, {
    //   reportProgress: true,
    //   observe: 'events'
    // })
    //     .subscribe(event => {
    //       // console.log(event);
    //     });

    // if (event.target.files && event.target.files[0]) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (event) => {
    //         //this.image = event.target.result;
    //     }
    //
    // }

    // this.articleservice.addArticles(Article);
    this.articleservice.addArticles(Article).
      subscribe(() => this.router.navigate(['/home']));

    this.openSnackbar();
  }

  openSnackbar() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
      announcementMessage: 'test msg'
    });
    throw new Error('Method not implemented.');
  }

}
