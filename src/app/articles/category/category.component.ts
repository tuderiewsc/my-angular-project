import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Paginate } from 'src/app/models/paginate';
import { PagerService } from 'src/app/services/pager.services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  articles: ArticleModel[];
  catPager: Paginate;

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
              this.catPager = this.pagerservice.getPager(result.total, result.current_page, result.per_page)
          });
    });



  }

}
