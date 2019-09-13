import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { articleStatsToken } from 'src/app/providers/article.provider';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addArticleForm: FormGroup;


  title: string;
  desc: string;
  slug: string;
  image: string;
  submitted: boolean;
  isfavorite: boolean;
  fileToUpload: File = null;

  lastArticleId: number;



  // @Output() newArticle = new EventEmitter<ArticleModel>();


  constructor(private articleservice: ArticlesService, private router: Router,
    private formbuilder: FormBuilder, private snackbar: MatSnackBar,
    private http: HttpClient, @Inject(articleStatsToken) public stats) {
  }

  ngOnInit() {
    this.getArticles();
    this.buildForm();
  }


  getArticles() {
    this.articleservice.getArticles().
      subscribe(articles => this.lastArticleId = (articles.length) + 1);
  }


  buildForm() {
    this.addArticleForm = this.formbuilder.group({
      title: this.formbuilder.control('', Validators.required),
      desc: this.formbuilder.control('', Validators.compose([
        Validators.maxLength(20),
        Validators.required
      ])),
      submitted: this.formbuilder.control('', Validators.required),
      isfavorite: this.formbuilder.control('', Validators.required),
      image: this.formbuilder.control('', Validators.required)



      // title: ['', Validators.required],
      // desc: ['', [
      //   Validators.maxLength(20),
      //   Validators.required
      // ]],
      // submitted: ['', Validators.required],
      // isfavorite: ['', Validators.required],
      // image: ['', Validators.required]
    });
  }


  onsubmit() {
    const Article = new ArticleModel();

    Article.id = this.lastArticleId;
    // Article.id = Math.floor(Math.random() * 100);
    Article.title = this.title;
    // Article.image = this.image;
    Article.image = '/assets/images/slide1.jpg';
    Article.desc = this.desc;
    Article.slug = this.slug;
    Article.createdat = Date.now();
    Article.isfavorite = this.isfavorite;
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