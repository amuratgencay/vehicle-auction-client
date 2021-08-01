import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { FavoriIlanYaklasiyorNotificationComponent } from './favori-ilan-yaklasiyor-notification.component';
import {
  IhaleTeklifVerilenAracDTO, IhaleService, IhaleAracService,
  UyeBilgiServiceExtended
} from '@zyazilim/online-ihale-data';

@Injectable({
  providedIn: 'root'
})
export class FavoriIlanYaklasiyorNotificationService {
  subscriptions: Subscription[] = [];
  aktifArac: IhaleTeklifVerilenAracDTO;
  options: GlobalConfig;
  sonToastrId: number;
  constructor(private ihaleService: IhaleService,
    private ihaleAracService: IhaleAracService,
    private toastrService: ToastrService,
    private uyeBilgiService: UyeBilgiServiceExtended) { }
  init() {
    this.options = this.toastrService.toastrConfig;
    this.subscriptions.push(this.ihaleService.aracDegisti().subscribe(data => {
      this.aktifArac = data;
    }));
    this.subscriptions.push(this.ihaleService.ihaleKapandi().subscribe(data => {
      this.aktifArac = null;
      this.toastrService.clear(this.sonToastrId);
    }));
    this.subscriptions.push(this.ihaleAracService.getTeklifVerilenArac()
      .subscribe(d => {
        this.aktifArac = d;
        this.favoriIlanaAzKaldi();
      }));
    this.subscriptions.push(this.uyeBilgiService.favoriIlanlarChanged.subscribe(d => {
      this.favoriIlanaAzKaldi();
    }))
  }
  favoriIlanaAzKaldi() {
    if (this.uyeBilgiService.favoriIlanlar && this.aktifArac && !this.sonToastrId) {
      const ihaledekiAraclar = this.uyeBilgiService.favoriIlanlar.filter(p => p.ihaleArac.ihaleBilgisiId === this.aktifArac.ihaleBilgisiId && (p.ihaleArac.ihaleSirasi - this.aktifArac.ihaleSirasi) > 0 && (p.ihaleArac.ihaleSirasi - this.aktifArac.ihaleSirasi) < 3);
      if (ihaledekiAraclar.length) {
        const opt = { ...this.options };
        opt.autoDismiss = false;
        opt.disableTimeOut = true;
        opt.tapToDismiss = true;
        opt.preventDuplicates = true;
        opt.toastComponent = FavoriIlanYaklasiyorNotificationComponent;
        const inserted = this.toastrService.show('', '', opt);
        let instance = inserted.toastRef.componentInstance as FavoriIlanYaklasiyorNotificationComponent;
        instance.araclar = ihaledekiAraclar;
        instance.guncelSira = this.aktifArac.ihaleSirasi;
        this.sonToastrId = inserted.toastId;
      }
    }
  }
}
