import { Component, EventEmitter, OnInit, Output, Inject, OnDestroy } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { articleStatsToken } from 'src/app/providers/article.provider';
import { ApiService } from 'src/app/services/api.service';
import { transition, useAnimation, trigger } from '@angular/animations';
import { fadeAnimation } from '../animations/animations';
import { CategoryModel } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';


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
  submitted: boolean;
  isfavorite: boolean;
  fileToUpload: File = null;
  lastArticleId: number;
  categories: CategoryModel[];
  user: any;
  // @Output() newArticle = new EventEmitter<ArticleModel>();


  constructor(private router: Router,
    private formbuilder: FormBuilder, private snackbar: MatSnackBar,
    private http: HttpClient, @Inject(articleStatsToken) public stats,
    private api: ApiService, private authservice: AuthService) {
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
      image: this.formbuilder.control('', Validators.required),
      category_id: this.formbuilder.control('', Validators.required),
    });
  }


  onsubmit() {
    const Article = new ArticleModel();

    Article.title = this.title;
    Article.image = this.image;
    Article.desc = this.desc;
    Article.category_id = this.category_id;
    Article.user_id = this.user.id;
    if (this.submitted === true) { Article.submitted = true; } else { Article.submitted = false; }
    if (this.isfavorite === true) { Article.isfavorite = true; } else { Article.isfavorite = false; }

    this.api.addArticle(Article)
      .subscribe(() => this.router.navigate(['/home']));

    this.openSnackbar();
  }

  openSnackbar() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
      // announcementMessage: 'test msg'
    });
  }

}
