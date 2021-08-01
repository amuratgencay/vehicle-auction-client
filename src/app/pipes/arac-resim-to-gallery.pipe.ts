import { Pipe, PipeTransform } from '@angular/core';
import { ResimYokPipe } from './resim-yok.pipe';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { AracResimDTO } from '@zyazilim/online-ihale-data';

@Pipe({
  name: 'aracResimToGallery'
})
export class AracResimToGalleryPipe implements PipeTransform {
  /**
   *
   */
  constructor(private resimYokPipe: ResimYokPipe) {

  }
  transform(value: AracResimDTO[], ...args: any[]): any {
    let resimler = this.resimYokPipe.transform(value) as AracResimDTO[];
    return resimler.map(a => {
      return new NgxGalleryImage({ description: a.resimAciklama, big: a.url, small: a.thumbUrl || a.url, medium: a.mediumUrl || a.url, label: a.resimAdi });
    })
  }
}
