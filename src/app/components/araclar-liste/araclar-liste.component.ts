import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ScrollTopService } from '../scroll-top/scroll-top.service';
import { IhaleAracListeDTO, IhaleBilgisiListeDTO, FavoriIlanService, UyeBilgiService, AuthService, UyeBilgiServiceExtended, AuthServiceExtended, FavoriIlanEkleDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-araclar-liste',
  templateUrl: './araclar-liste.component.html',
  styleUrls: ['./araclar-liste.component.scss']
})


export class AraclarListeComponent implements OnInit, OnChanges {
  @Input() araclar: IhaleAracListeDTO[];
  @Input() aktifIhale: IhaleBilgisiListeDTO;
  order: { key?: string, reverse?: boolean } = { key: 'ihaleSirasi' };
  sayfalama: { itemsPerPage?: number, currentPage?: number, totalItems?: number } = { itemsPerPage: 9, currentPage: 1 };

  public eskiArac(arac: IhaleAracListeDTO): boolean {
    let buYil = new Date().getFullYear();
    if (new Date().getMonth() <= 6) {
      buYil--;
    }
    return arac && arac.aracYili < buYil;
  }
  /// Buraya kadar


  constructor(
    private favoriIlanService: FavoriIlanService,
    protected scrollTopService: ScrollTopService,
    private uyeBilgiService: UyeBilgiServiceExtended,
    private authService: AuthServiceExtended) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sayfalama.totalItems = this.araclar ? this.araclar.length : 0;
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
  siralamaDegistir(key) {
    if (this.order.key === key) {
      if (this.order.reverse) {
        this.order.key = 'ihaleSirasi';
        this.order.reverse = false;
      } else {
        this.order.reverse = !this.order.reverse;
        this.order.key = key;
      }
    } else {
      this.order.key = key;
      this.order.reverse = false;
    }
  }
  sayfaDegisti(e) {
    this.sayfalama.currentPage = e;
    this.scrollTopService.scrollToTop();
  }
}
