import { Component, OnInit, Input } from '@angular/core';
import { BilgiModalComponent } from '../bilgi-modal/bilgi-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriIlanService, UyeBilgiService, AuthService, AuthServiceExtended, UyeBilgiServiceExtended, FavoriIlanEkleDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-favori-ekle',
  templateUrl: './favori-ekle.component.html',
  styleUrls: ['./favori-ekle.component.scss']
})
export class FavoriEkleComponent implements OnInit {
  @Input() iconSize: 'sm' | 'md' | 'lg';
  @Input() ihaleAracId: any;
  @Input() showWithText: any;
  constructor(
    private favoriIlanService: FavoriIlanService,
    private uyeBilgiService: UyeBilgiServiceExtended,
    private authService: AuthServiceExtended,
    private modal: NgbModal) { }

  ngOnInit() {
  }
  favoriIlanMi() {
    return this.uyeBilgiService.favoriIlanlar && this.uyeBilgiService.favoriIlanlar.find(p => p.ihaleAracId === this.ihaleAracId);
  }
  favoriEkleCikar() {
    if (this.authService.getToken()) {
      if (this.favoriIlanMi()) {
        let favoriIlan = this.uyeBilgiService.favoriIlanlar.find(p => p.ihaleAracId === this.ihaleAracId);
        this.favoriIlanService.delete(favoriIlan.id)
          .subscribe(d => {
            this.uyeBilgiService.getFavoriIlanlar(this.authService.getToken().userId)
              .subscribe();
          });
      } else {
        this.favoriIlanService.post(new FavoriIlanEkleDTO({ ihaleAracId: this.ihaleAracId, uyeBilgiId: this.authService.getToken().userId, id: null, olusturmaZamani: new Date() }))
          .subscribe(d => {
            this.uyeBilgiService.getFavoriIlanlar(this.authService.getToken().userId)
              .subscribe();
          });
      }

    } else {
      let modalRef = this.modal.open(BilgiModalComponent, { centered: true });
      (modalRef.componentInstance as BilgiModalComponent).icerik = 'Favorilere eklemek için üye girişi yapmalısınız.';
      (modalRef.componentInstance as BilgiModalComponent).ustBaslik = 'Bilgi';
      (modalRef.componentInstance as BilgiModalComponent).butonMetin = 'Tamam';
    }
  }
}
