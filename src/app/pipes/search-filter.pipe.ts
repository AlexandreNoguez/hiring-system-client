import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(items: any, searchTerm: any): any[] {
    if (!searchTerm) {
      return items;
    }

    return items.filter((item: string) => item.toLowerCase().includes(searchTerm));
  }

}
