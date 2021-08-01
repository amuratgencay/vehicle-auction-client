import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? value.replace(/<[^>]*>/g, '') : '';
  }

}
