import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { AktifIhaleAracNotificationComponent } from './aktif-ihale-arac-notification.component';
import { IhaleTeklifVerilenAracDTO, IhaleService, IhaleAracService, IhaleTeklifServiceExtended } from '@zyazilim/online-ihale-data';

@Injectable({
  providedIn: 'root'
})
export class AktifIhaleAracNotificationService {
  private subscriptions: Subscription[] = [];
  private aktifArac: IhaleTeklifVerilenAracDTO;
  private sonAktifAracToastrId;
  private options: GlobalConfig;
  private sayfadakiAracId: string;
  public get teklifSayfadakiAracaVeriliyor(): boolean {
    return this.sayfadakiAracId && this.aktifArac && this.aktifArac.id === this.sayfadakiAracId;
  }
  constructor(private ihaleService: IhaleService,
    private toastrService: ToastrService,
    private ihaleAracService: IhaleAracService,
    private ihaleTeklifService: IhaleTeklifServiceExtended
  ) {

  }
  init() {
    this.options = this.toastrService.toastrConfig;
    this.subscriptions.push(this.ihaleService.aracDegisti().subscribe(data => {
      this.aktifArac = data;
      this.kapat();
      this.aktifAracNotification();
    }));
    this.subscriptions.push(this.ihaleService.ihaleKapandi().subscribe(data => {
      this.aktifArac = null;
      this.toastrService.clear(this.sonAktifAracToastrId);
    }));
    this.subscriptions.push(this.ihaleAracService.getTeklifVerilenArac()
      .subscribe(d => {
        this.aktifArac = d;
        this.aktifAracNotification();
      }));
    this.sayfadakiAracId = this.ihaleTeklifService.sayfadakiAracId;
    this.subscriptions.push(this.ihaleTeklifService.sayfadakiAracIdChange.subscribe(d => {
      this.sayfadakiAracId = d;
      if (!this.teklifSayfadakiAracaVeriliyor) {
        this.aktifAracNotification();
      } else {
        this.kapat();
      }
    }));
  }
  private kapat() {
    if (this.sonAktifAracToastrId) {
      this.toastrService.clear(this.sonAktifAracToastrId);
      this.sonAktifAracToastrId = null;
    }
  }
  private aktifAracNotification() {
    if (this.aktifArac && this.aktifArac.kalanZamanSn && !this.sonAktifAracToastrId && !this.teklifSayfadakiAracaVeriliyor) {
      const opt = { ...this.options };
      opt.autoDismiss = false;
      opt.disableTimeOut = true;
      opt.tapToDismiss = false;
      opt.preventDuplicates = true;
      opt.toastComponent = AktifIhaleAracNotificationComponent;
      const inserted = this.toastrService.show('', '', opt);
      inserted.toastRef.componentInstance.aktifArac = this.aktifArac;
      this.sonAktifAracToastrId = inserted.toastId;
    }
  }
  destroy() {
    for (const element of this.subscriptions) {
      element.unsubscribe();
    }
  }
}
