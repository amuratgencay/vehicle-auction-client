import { Component, OnInit } from '@angular/core';
import { IhaleBilgisiListeDTO, IhaleService, IhaleAracListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-one-cikan-araclar',
  templateUrl: './one-cikan-araclar.component.html',
  styleUrls: ['./one-cikan-araclar.component.scss']
})
export class OneCikanAraclarComponent implements OnInit {
  enYakinIhale: IhaleBilgisiListeDTO;
  araclar: IhaleAracListeDTO[];
  sayfa = 0;
  sayfadakiOgeSayisi = 4;
  constructor(private ihaleService: IhaleService) { }
  ngOnInit() {
    this.ihaleService.getEnYakinVeyaAktifIhale()
      .subscribe(i => {
        this.enYakinIhale = i;
        if (this.enYakinIhale) {
          this.ihaleService.getOneCikanAraclar(this.enYakinIhale.id)
            .subscribe(d => {
              this.araclar = d.sort((a, b) => { return a.ihaleSirasi - b.ihaleSirasi });
            });
        }
      });
  }
  oncekiSayfa() {
    if (this.sayfa > 0) {
      this.sayfa--;
    }
  }
  sonrarkiSayfa() {
    if (this.sayfa + 1 < this.araclar.length / this.sayfadakiOgeSayisi) {
      this.sayfa++;
    }
  }
}
