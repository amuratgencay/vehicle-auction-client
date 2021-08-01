import { Component, OnInit, Input } from '@angular/core';
import { IhaleAracListeDTO, IhaleAracService, FavoriIlanService, UyeBilgiService, AuthService, AuthServiceExtended, UyeBilgiServiceExtended, FavoriIlanEkleDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-siradaki-araclar',
  templateUrl: './siradaki-araclar.component.html',
  styleUrls: ['./siradaki-araclar.component.scss']
})
export class SiradakiAraclarComponent implements OnInit {
  @Input() aracId: any;
  @Input() ihaleId: any;
  siradakiAraclar: IhaleAracListeDTO[];
  sayfa = 0;
  sayfadakiOgeSayisi = 4;
  constructor(private ihaleAracService: IhaleAracService,
    private favoriIlanService: FavoriIlanService,
    private uyeBilgiService: UyeBilgiServiceExtended,
    private authService: AuthServiceExtended) { }

  ngOnInit() {
    this.ihaleAracService.getIhaledekiSonrakiAraclar(this.aracId, this.ihaleId)
      .subscribe(data => {
        this.siradakiAraclar = data.sort((a, b) => a.ihaleSirasi - b.ihaleSirasi);
      });
  }
  oncekiSayfa() {
    if (this.sayfa > 0) {
      this.sayfa--;
    }
  }
  sonrarkiSayfa() {
    if (this.sayfa + 1 < this.siradakiAraclar.length / this.sayfadakiOgeSayisi) {
      this.sayfa++;
    }
  }
  favoriIlanMi(ihaleAracId) {
    return this.uyeBilgiService.favoriIlanlar && this.uyeBilgiService.favoriIlanlar.find(p => p.ihaleAracId === ihaleAracId);
  }
  favoriEkleCikar(ihaleAracId) {
    if (this.authService.getToken()) {
      if (this.favoriIlanMi(ihaleAracId)) {
        let favoriIlan = this.uyeBilgiService.favoriIlanlar.find(p => p.ihaleAracId === ihaleAracId);
        this.favoriIlanService.delete(favoriIlan.id)
          .subscribe(d => {
            this.uyeBilgiService.getFavoriIlanlar(this.authService.getToken().userId)
              .subscribe();
          });
      } else {
        this.favoriIlanService.post(new FavoriIlanEkleDTO({ ihaleAracId: ihaleAracId, uyeBilgiId: this.authService.getToken().userId, id: null, olusturmaZamani: new Date() }))
          .subscribe(d => {
            this.uyeBilgiService.getFavoriIlanlar(this.authService.getToken().userId)
              .subscribe();
          });
      }

    }
  }
}
