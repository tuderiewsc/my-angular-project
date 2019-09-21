import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '../services/articles.service';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Paginate } from '../models/paginate';
import { PagerService } from '../services/pager.services';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { Logs } from 'selenium-webdriver';



@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {


    title: string;
    image: string;
    desc: string;
    createdat: Date;
    submitted: boolean;
    selectedArticle: ArticleModel;
    articles: ArticleModel[];
    pager: Paginate;




    constructor(private api: ApiService, private activateroute: ActivatedRoute,
        private pagerservice: PagerService) { }

    ngOnInit() {
        this.getArticles();



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
                    this.pager = this.pagerservice.getPager(res.total, res.current_page, res.per_page);
                }));


    }

}
