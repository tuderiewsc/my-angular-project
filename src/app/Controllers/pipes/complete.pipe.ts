import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from '../../Models/article.model';


@Pipe({
  name: 'complete',
  pure: true
})
export class CompletePipe implements PipeTransform {

  transform(articles: ArticleModel[], ...args: any[]): any {
    if (!articles) {
      return articles;
    }

    const complete = args[0];
    return articles.filter((article: ArticleModel) => {
      if (article.submitted === complete) {
        return 1;
      } else {
        return 0;
      }
    });



  }

}
