import { Pipe, PipeTransform } from '@angular/core';
import {CategoryModel} from '../../Models/category.model';

@Pipe({
  name: 'catSearch',
  pure: true
})
export class catSearchPipe implements PipeTransform {

  transform(categories: CategoryModel[], ...args: any[]): any {
    if (!categories && !args) {
      return categories;
    }

    const keyword = args[0];
    return categories.filter((category: CategoryModel) =>
      category.name.indexOf(keyword) !== -1);
  }

}
