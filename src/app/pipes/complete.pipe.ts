import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from '../models/article.model';


@Pipe({
  name: 'complete',
  pure: false
})
export class CompletePipe implements PipeTransform {

  transform(articles: ArticleModel[], ...args: any[]): any {
    if (!articles) {
      return articles;
    }

    const complete = args[0];
    return articles.filter((article: ArticleModel) => {
      return article.submitted === complete;
    });



  }

}
