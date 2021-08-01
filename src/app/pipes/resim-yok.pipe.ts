import { Pipe, PipeTransform } from '@angular/core';
import { AracResimDTO } from '@zyazilim/online-ihale-data';

@Pipe({
  name: 'resimYok'
})
export class ResimYokPipe implements PipeTransform {

  transform(value: AracResimDTO[] | AracResimDTO, ...args: any[]): AracResimDTO[] | AracResimDTO {
    if (!value || (Array.isArray(value) && !(value as AracResimDTO[]).length)) {



      // Araç görseli değişti. Yükseklik 375px olarak gelmesi lazım, ihale-aracdetay.component.ts içindeki tanımlama height: '375px" şeklinde olmalı


      let aracBosResim = new AracResimDTO();
      aracBosResim.url = '/assets/img/static/arac-gorseli-hazirlaniyor.jpg';
      aracBosResim.mediumUrl = '/assets/img/static/arac-gorseli-hazirlaniyor.jpg';
      aracBosResim.thumbUrl = '/assets/img/static/arac-gorseli-hazirlaniyor.jpg';
      aracBosResim.durum = true;
      aracBosResim.resimAdi = 'no-image';
      aracBosResim.resimSira = 0;
      if (Array.isArray(value)) {
        return [aracBosResim];
      }
      return aracBosResim;
    }
    return value;
  }

}