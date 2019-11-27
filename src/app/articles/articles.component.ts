import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Paginate } from '../models/paginate';
import { PagerService } from '../services/pager.services';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/category.model';
import { trigger, transition, query, style, animate, stagger } from '@angular/animations';


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


    title: string;
    image: string;
    desc: string;
    createdat: Date;
    submitted: boolean;
    selectedArticle: ArticleModel;
    articles: ArticleModel[];
    categories: CategoryModel[];
    pager: Paginate;




    constructor(private api: ApiService, private activateroute: ActivatedRoute,
        private pagerservice: PagerService) { }

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
                    console.log('articles: ' + res.data);
                    this.pager = this.pagerservice.getPager(res.total, res.current_page, res.per_page);
                }));

    }

    getCategories() {
        this.api.getCategories()
            .subscribe(res => this.categories = res);
    }

}
