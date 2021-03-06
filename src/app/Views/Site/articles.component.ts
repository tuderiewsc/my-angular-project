import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../Models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../Controllers/services/api.service';
import { Paginate } from '../../Models/paginate';
import { PagerService } from '../../Controllers/services/pager.services';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../../Models/category.model';
import { trigger, transition, query, style, animate, stagger } from '@angular/animations';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    animations: [
        trigger('articleAnimation', [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),
                query(':enter', stagger('200ms', [
                    animate('1.5s', style({ opacity: 1 }))
                ]), { optional: true })
            ])
        ])
    ]
})
export class ArticlesComponent implements OnInit {

  page_title: string = 'مقالات' ;


  title: string;
  image: string;
  desc: string;
  createdat: Date;
  submitted: boolean;
  selectedArticle: ArticleModel;
  articles: ArticleModel[];
  categories: CategoryModel[];
  pager: Paginate;
  loaded:boolean=false;


  constructor(private api: ApiService, private activateroute: ActivatedRoute,
              private pagerservice: PagerService, private titleService:Title,
              private activeroute:ActivatedRoute) {

    this.titleService.setTitle(activeroute.snapshot.data['title']);

  }

    ngOnInit() {

      this.getArticles();
      this.getCategories();
        // this.selectedArticle = null;
        // var Now = this.datePipe.transform(new Date(),"dd-MM-yyyy");
    }


    getArticles() {
        /////////// single route ///////////
        // let id: number;
        // id = +this.route.snapshot.paramMap.get('id');
        // this.api.getArticles(id).subscribe(res => {
        //     this.pager = this.pagerservice.getPager(res.total, res.current_page, res.per_page);
        //     this.articles = res.data;
        //     console.log(res);
        // });

        /////////// reuse route ///////////
        this.activateroute.params.pipe
            (map((params: Params) => params.id))
            .subscribe(id => this.api.getArticles(id)
                .subscribe(res => {
                    this.articles = res.data;
                    this.loaded = true;
                    this.pager = this.pagerservice.getPager(res.total, res.current_page, res.per_page);
                }));

        this.articles = [];

    }

    getCategories() {
        this.api.getCategories()
            .subscribe(res => this.categories = res);
    }

}
