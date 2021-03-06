import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ArticleModel } from '../../Models/article.model';
import { catchError, tap, delay } from 'rxjs/operators';
import { Constants } from '../../Constants';
import {CategoryModel} from '../../Models/category.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }


  getArticles(pagenumber: number): Observable<any> {
    return this.http.get(Constants.urlArticles + pagenumber);
  }

  getArticlesList(userId: number): Observable<any> {
    return this.http.get(Constants.urlArticlesList + '/' + userId);
  }

  getArticle(id: number): Observable<ArticleModel> {
    return this.http.get<ArticleModel>(Constants.urlOne + '/' + id)
      .pipe(
        tap(_ => console.log(`Article_id=${id}`)),
        catchError(this.handleError),
        // catchError(this.handleError<ArticleModel>(`Article_id=${id}`)),
        delay(1000)
      );
  }

  getsearchArticle(phrase: string): Observable<any> {
    return this.http.get<any>(Constants.searchArticleUrl + '/' + phrase);
  }

  getCategories(): Observable<any> {
    return this.http.get(Constants.urlCats);
  }

  getHeadCategories(): Observable<any> {
    return this.http.get(Constants.urlHeadCats);
  }

  getSingleCategory(id: number): Observable<any> {
    return this.http.get(Constants.urlCats + '/' + id);
  }

  getCategory(id: number, pagenumber: number): Observable<any> {
    return this.http.get(Constants.urlOneCat + '/' + id + '?page=' + pagenumber)
      .pipe(
        tap(_ => console.log(`Category_id=${id}`)),
        catchError(this.handleError),
        delay(200)
      );
  }

  addCategory(values:any): Observable<any> {
    return this.http.post<boolean>(Constants.urlCats, values, this.httpOptions);
  }

  updateCategory(values:any, id:number){
    return this.http.put<boolean>(Constants.urlCats+ '/' + id, values, this.httpOptions);
  }

  deleteCategory(id: number): Observable<CategoryModel> {
    return this.http.delete<CategoryModel>(Constants.urlCats + '/' + id);
  }


  getImgList(section:string): Observable<any> {
    return this.http.get(Constants.uploadImageList + section);
  }

  // private handleError(error: HttpErrorResponse) {
  //   return throwError(error.message);
  // }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instea
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addArticle(article: ArticleModel): Observable<any> {
    return this.http.post<ArticleModel>(Constants.urlOne, article, this.httpOptions);
  }

  updateArticle(article: ArticleModel, id: number): Observable<any> {
    return this.http.put<any>(Constants.urlArticlesUpdate + id, article, this.httpOptions);
  }

  updateArticleStatus(article: ArticleModel, id: number): Observable<any> {
    return this.http.put<any>(Constants.urlUpdateStatus + id, article, this.httpOptions);
  }

  deleteArticle(id: number): Observable<ArticleModel> {
    return this.http.delete<ArticleModel>(Constants.urlOne + '/' + id);
  }

  updateUser(values: any, id:number): Observable<boolean>{
    return this.http.put<boolean>(Constants.urlUpdateUser+ id, values , this.httpOptions);
  }

  getUser(id:number): Observable<any>{
    return this.http.get(Constants.urlgetUser+ id , this.httpOptions);
  }

}

