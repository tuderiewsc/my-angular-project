import { Injectable } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { map, tap, catchError, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    private httpOptions = {
        headers: new HttpHeaders({
            'content-Type': 'application/json',
        })
    };

    url = 'http://localhost:8020/api/articles';
    urlOne = 'http://localhost:8020/api/article';
    httpClient: any;


    constructor(private http: HttpClient) { }


    getArticles(): Observable<ArticleModel[]> {
        return this.http.get<ArticleModel[]>(this.url);
    }

    getArticle(id: number): Observable<ArticleModel> {
        return this.http.get<ArticleModel>(this.urlOne + '/' + id)
            .pipe(
                // map(res=> res.name + '...'),
                // delay(5000)
                tap(_ => console.log(`Article_id=${id}`)),
                catchError(this.handleError<ArticleModel>(`Article_id=${id}`)),
                delay(1000)
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instea
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


    addArticles(article: ArticleModel): Observable<any> {
        return this.http.post<ArticleModel>(this.urlOne, article, this.httpOptions);

    }

    updatearticles(article: ArticleModel): Observable<any> {
        return this.http.put<ArticleModel>(this.urlOne, article);
    }

    deleteArticle(deletedArticle: ArticleModel): Observable<any> {
        const newUrl = this.urlOne + '/' + deletedArticle._id;
        return this.http.delete(newUrl);
    }





}
