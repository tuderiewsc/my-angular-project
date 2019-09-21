import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ArticleModel } from '../models/article.model';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { CategoryModel } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://localhost:8000/api/articles?page=';
  urlOne = 'http://localhost:8000/api/articles';
  urlCats = 'http://localhost:8000/api/categories';
  urlOneCat = 'http://localhost:8000/api/articles/categories';


  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getArticles(pagenumber: number): Observable<any> {
    return this.http.get(this.url + pagenumber);
  }
  getArticle(id: number): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(this.urlOne + '/' + id)
      .pipe(
        tap(_ => console.log(`Article_id=${id}`)),
        catchError(this.handleError),
        // catchError(this.handleError<ArticleModel>(`Article_id=${id}`)),
        delay(1000)
      );
  }


  getCategories(): Observable<any> {
    return this.http.get(this.urlCats);
  }
  getCategory(id: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(this.urlOneCat + '/' + id)
      .pipe(
        tap(_ => console.log(`Category_id=${id}`)),
        catchError(this.handleError),
        delay(2000)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }


  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error); // log to console instea
  //     console.log(`${operation} failed: ${error.message}`);
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  addArticle(article: ArticleModel): Observable<any> {
    return this.http.post<ArticleModel>(this.urlOne, article, this.httpOptions);
  }

}

