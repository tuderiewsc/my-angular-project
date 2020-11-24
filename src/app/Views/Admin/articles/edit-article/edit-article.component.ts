import { Component, OnInit, Inject } from '@angular/core';
import { ArticleModel } from '../../../../Models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { articleStatsToken } from 'src/app/Controllers/providers/article.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { CategoryModel } from 'src/app/Models/category.model';
import { Observable } from 'rxjs';
import {ImglistComponent} from '../../../dialog/imglist/imglist.component';
import {MatDialog} from '@angular/material';



@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {


  editArticleForm: FormGroup;

  title: string;
  desc: string;
  image: string;
  category_id: number;
  submitted: string;
  isfavorite: string;
  article: ArticleModel;
  categories: CategoryModel;
  editPressed: boolean = false;
  loaded: boolean = false;



  constructor(private route: ActivatedRoute, private router: Router
    , private api: ApiService, private formbuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.getArticle(id);

    this.api.getCategories()
      .subscribe(res => this.categories = res);

    this.buildForm();
    localStorage.removeItem('imageSrc');
  }

  Editpressed(){
    this.editPressed = true;
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.title == undefined && this.desc == undefined &&
      this.image == undefined && this.category_id == undefined){
      return true;
    } else{
      if( this.title !==this.article.title || this.desc !==this.article.desc
        || this.image !==this.article.image || this.category_id !== this.article.category_id
      ) {

        if(this.editPressed == false){
          return window.confirm('تغییرات ذخیره نشوند?');
        }else {
          return true;
        }
      }
    }


  }

  buildForm() {
    this.editArticleForm = this.formbuilder.group({
      title: this.formbuilder.control('', Validators.required),
      desc: this.formbuilder.control('', Validators.compose([
        Validators.maxLength(1000),
        Validators.required
      ])),
      submitted: this.formbuilder.control('', Validators.required),
      isfavorite: this.formbuilder.control('', Validators.required),
      image: this.formbuilder.control('', Validators.required),
      category_id: this.formbuilder.control('', Validators.required)
    });
  }

  getArticle(id) {
    this.api.getArticle(id)
      .subscribe(res => {
        this.article = res,
          this.loaded=true
      });
  }

  onEditArticle(id: number) {

    console.log('storage: ' + localStorage.getItem('imageSrc'));
    console.log('image: ' + this.image);

    const Article = new ArticleModel();

    Article.title = this.title;
    Article.desc = this.desc;
    Article.category_id = this.category_id;

    if (this.submitted == undefined){
      Article.submitted = this.article.submitted;
    } else {
      if (this.submitted === '1') {Article.submitted = true;} else {Article.submitted = false;}
    }

    if (this.isfavorite == undefined){
      Article.isfavorite = this.article.isfavorite;
    }else{
        if (this.isfavorite === '1') {Article.isfavorite = true;} else {Article.isfavorite = false;}
    }

    if(localStorage.getItem('imageSrc') !== null){
      Article.image= 'http://demoapps.ir/demo/api_articles/article/public/upload/image/'
        +localStorage.getItem('imageSrc');
    }else {
      if(this.image == undefined){
        Article.image = '/assets/images/imagenotfound.jpg';
      }
    }

    alert('مقاله ویرایش شد.');
    this.api.updateArticle(Article, id)
      .subscribe(() => this.router.navigate(['/dashboard/article/list'] ));
  }


  openDialog() {
    localStorage.setItem('imgSection', 'article');
    this.dialog.open(ImglistComponent, {
      width: '720px'
    });
  }

  removeImageSrc(){
    localStorage.removeItem('imageSrc');
  }






}
