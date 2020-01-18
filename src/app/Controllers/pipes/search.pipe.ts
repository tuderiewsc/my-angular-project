import { Pipe, PipeTransform } from '@angular/core';
import { ArticleModel } from '../../Models/article.model';

@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {

  transform(articles: ArticleModel[], ...args: any[]): any {
    if (!articles && !args) {
      return articles;
    }

    const keyword = args[0];
    return articles.filter((article: ArticleModel) =>
      article.title.indexOf(keyword) !== -1);
  }

}
