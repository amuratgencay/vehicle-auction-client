import { Pipe, PipeTransform } from '@angular/core';
import { ResimYokPipe } from './resim-yok.pipe';
import { AracResimDTO } from '@zyazilim/online-ihale-data';

@Pipe({
  name: 'resimSec'
})
export class ResimSecPipe implements PipeTransform {
  constructor(private resimYokPipe: ResimYokPipe) {

  }
  transform(value: AracResimDTO[], ...args: any[]): AracResimDTO {
    let resimler = this.resimYokPipe.transform(value) as AracResimDTO[];
    if (args[0] && args[0] < resimler.length) {
      return resimler[args[0]]
    }
    return resimler.sort((a, b) => a.resimSira - b.resimSira)[0];
  }

}
