import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  articles: ArticleModel[];

  constructor(private api: ApiService, private activeroute: ActivatedRoute) { }

  ngOnInit() {

    this.activeroute.params.pipe(map((params: Params) => params.id))
      .subscribe(id => this.api.getCategory(id)
        .subscribe(res => this.articles = res.data)
      );

  }

}
