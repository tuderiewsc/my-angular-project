import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ArticlesService } from '../services/articles.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { log } from 'util';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {


    title: string;
    image: string;
    desc: string;
    createdat: number;
    // createdat: Date;
    submitted: boolean;

    selectedArticle: ArticleModel;
    articles: ArticleModel[];




    constructor(private http: HttpClient, private articlesService: ArticlesService,
        private authservice: AuthService, private router: Router,
        private api: ApiService) { }

    ngOnInit() {
        this.getArticles();
        this.selectedArticle = null;
        // var Now = this.datePipe.transform(new Date(),"dd-MM-yyyy");
    }

    getArticles() {
        // this.articlesService.getArticles().
        //     subscribe(articles => this.articles = articles);

        this.api.getArticles().subscribe(articles => this.articles = articles);
    }



    // onNewArticle(event:ArticleModel){
    //     this.articlesService.addArticles(event).
    //     subscribe(success=> console.log('success'));
    //     // this.articles.push(event);
    //     // this.selectedArticle = null;
    // }

    setSelected(article: ArticleModel) {
        this.selectedArticle = article;
    }







}