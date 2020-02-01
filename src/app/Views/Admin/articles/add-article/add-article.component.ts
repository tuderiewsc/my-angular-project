import {Component, EventEmitter, OnInit, Output, Inject, OnDestroy, Input} from '@angular/core';
import { ArticleModel } from '../../../../Models/article.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackbarComponent } from 'src/app/Views/dialog/snackbar/snackbar.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { articleStatsToken } from 'src/app/Controllers/providers/article.provider';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { transition, useAnimation, trigger } from '@angular/animations';
import { fadeAnimation } from '../../../../Controllers/animations/animations';
import { CategoryModel } from 'src/app/Models/category.model';
import { AuthService } from 'src/app/Controllers/services/auth.service';
import { ImglistComponent } from 'src/app/Views/dialog/imglist/imglist.component';
import * as $ from 'jquery';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
  animations: [trigger('changeState', [
    transition('void => *', [useAnimation(fadeAnimation, {
      params: {
        delay: '300ms',
        from: 0,
        to: 1,
        time: '2s'
      }
    })])
  ])]
})
export class AddArticleComponent implements OnInit, OnDestroy {

  // declarations
  addArticleForm: FormGroup;
  title: string;
  desc: string;
  slug: string;
  image: string;
  category_id: number;
  user_id: number;
  submitted: string;
  isfavorite: string;
  fileToUpload: File = null;
  lastArticleId: number;
  categories: CategoryModel[];
  user: any;
  errorMessage: string;
  // @Output() newArticle = new EventEmitter<ArticleModel>();


  constructor(private router: Router,
              private formbuilder: FormBuilder, private snackbar: MatSnackBar,
              private http: HttpClient, @Inject(articleStatsToken) public stats,
              private api: ApiService, private authservice: AuthService
    , public dialog: MatDialog) {
  }

  ngOnInit() {
    this.api.getCategories()
      .subscribe(res => this.categories = res);

    this.user = this.authservice.getUser();
    this.buildForm();

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
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
      category_id: this.formbuilder.control('', Validators.required),
      image: this.formbuilder.control('', null),
    });
  }


  onsubmit() {
    const Article = new ArticleModel();

    Article.title = this.title;
    Article.image = this.image;
    Article.desc = this.desc;
    Article.category_id = this.category_id;
    Article.user_id = this.user.id;
    if (this.submitted === 'true') { Article.submitted = true; } else { Article.submitted = false; }
    if (this.isfavorite === 'true') { Article.isfavorite = true; } else { Article.isfavorite = false; }
    // if (this.image === undefined) {
    //   // default image
    //   Article.image = 'http://localhost:8000/upload/image/1573630832-2019-Image-not-found.jpg';
    // } else {
    //   Article.image = this.image;
    // }
    if(localStorage.getItem('imageSrc') !== null){
      Article.image= 'http://localhost:8000/upload/image/'
        +localStorage.getItem('imageSrc');
    }else {
      Article.image = 'http://localhost:8000/upload/image/1573630832-2019-Image-not-found.jpg';
    }


    this.api.addArticle(Article)
      .subscribe(res => {
        if (res){
          this.router.navigate(['/']),
            this.openSnackbar()
        }
      }, err =>{
        const message = err.error.message;
        this.errorMessage = message[Object.keys(message)[0]];

        setTimeout(() =>{
          this.errorMessage = undefined;
        },15000)
      });
  }

  removeImageSrc(){
    localStorage.removeItem('imageSrc');
  }

  openSnackbar() {
    localStorage.removeItem('snack');
    localStorage.setItem('snack', 'add_article');
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
      direction: 'rtl',
      panelClass: 'AddArticle'
      //announcementMessage: 'test msg'
    });
  }


  openDialog() {
    localStorage.setItem('imgSection', 'article');
    this.dialog.open(ImglistComponent, {
      width: '720px'
    });
  }




}
