import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleModel } from '../models/article.model';
import { map } from 'rxjs/operators';


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


  getArticles(): Observable<ArticleModel[]> {
    return this.http.get<ArticleModel[]>('http://localhost:8000/api/articles/');
  }

}

