import { Pipe, PipeTransform } from '@angular/core';
import {JobModel} from "../types/JobTypes";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: JobModel[], args?: string): JobModel[] {
    if(!value) return [];
    if(!args) return value;

    args = args.toLowerCase();

    return value.filter((job: JobModel) => {
      return job.title.toLowerCase().includes(args!)
    })
  }

}
