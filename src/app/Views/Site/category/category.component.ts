import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/Models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/Controllers/services/api.service';
import { Paginate } from 'src/app/Models/paginate';
import { PagerService } from 'src/app/Controllers/services/pager.services';
import { map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/Models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  articles: ArticleModel[];
  catPager: Paginate;
  category: CategoryModel;
  loaded: boolean = false;
  cat_loaded: boolean = false;

  id: number;
  pagenum: number;

  constructor(private api: ApiService, private activeroute: ActivatedRoute
    , private pagerservice: PagerService) { }

  ngOnInit() {

    this.activeroute.params.forEach((params: Params) => {
      this.id = params.id,
        this.pagenum = params.pagenum,
        this.api.getCategory(this.id, this.pagenum)
          .subscribe(result => {
            this.articles = result.data,
              this.catPager = this.pagerservice.getPager(result.total, result.current_page, result.per_page),
              this.loaded = true
          }),
        this.api.getSingleCategory(this.id).subscribe(res => {
          this.category = res,
            this.cat_loaded = true
        });
    });



  }

}
