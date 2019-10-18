import { Component, OnInit, Inject } from '@angular/core';
import { ArticleModel } from '../../models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { articleStatsToken } from 'src/app/providers/article.provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CategoryModel } from 'src/app/models/category.model';



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


  constructor(private route: ActivatedRoute, private router: Router
    , private api: ApiService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.getArticle(id);

    this.api.getCategories()
      .subscribe(res => this.categories = res);

    this.buildForm();

  }

  buildForm() {
    this.editArticleForm = this.formbuilder.group({
      title: this.formbuilder.control('', Validators.required),
      desc: this.formbuilder.control('', Validators.compose([
        Validators.maxLength(20),
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
      .subscribe(res => this.article = res);
  }

  onEditArticle(id: number) {
    const Article = new ArticleModel();


    Article.title = this.title;
    Article.image = this.image;
    Article.desc = this.desc;
    Article.category_id = this.category_id;
    if (this.submitted === '1') {
      Article.submitted = true;
    } else {
      Article.submitted = false;
    }
    if (this.isfavorite === '1') {
      Article.isfavorite = true;
    } else {
      Article.isfavorite = false;
    }



    this.api.updateArticle(Article, id)
      .subscribe(() => this.router.navigateByUrl('articlelist'));
  }






}
