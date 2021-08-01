import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTrFormat'
})
export class NumberTrFormatPipe implements PipeTransform {

  transform(val: any, ...args: any[]): any {
    if (val !== undefined && val !== null) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

}
