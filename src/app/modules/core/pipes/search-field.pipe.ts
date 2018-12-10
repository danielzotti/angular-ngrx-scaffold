import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchField'
})
export class SearchFieldPipe implements PipeTransform {
  transform(items: Array<any>, fields: string, filter: string): any {
    if (!items || !filter || !fields) {
      return items;
    }
    const keys: Array<string> = fields.split(',');

    return items.filter(item => {
      let isInFilter = false;
      for (let k = 0; k < keys.length; k++) {
        const keyItem = item[keys[k]];
        isInFilter = keyItem
          ? keyItem.search(new RegExp(`${filter}`, 'i')) !== -1
          : false;

        if (isInFilter) {
          break;
        }
      }
      return isInFilter;
    });
  }
}
