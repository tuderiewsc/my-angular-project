import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArticleModel, ArticleResolved } from '../../Models/article.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<ArticleResolved> {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ArticleResolved> {
    const id = +route.paramMap.get('id');
    // return this.articleService.getArticle(id);
    if (isNaN(+id)) {
      const message = `id is not a number ${id}`;
      console.error(message);
      return of({ resolvedarticle: null, error: message });
    }

    // return this.articleService.getArticle(+id).pipe(
    //   map(article => ({ resolvedarticle: article })),
    //   catchError(err => {
    //     const message = `unable to load`;
    //     console.error(message);
    //     return of({ resolvedarticle: null, error: message });
    //   })
    // );




  }
}
