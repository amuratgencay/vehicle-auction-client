import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService, ToastPackage, Toast } from 'ngx-toastr';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { IhaleAracListeDTO, IhaleTeklifVerilenAracDTO, IhaleService } from '@zyazilim/online-ihale-data';
import { IhaleSayfalamaBilgisi } from '@zyazilim/online-ihale-data/lib/modeller/ihale-sayfalama-bilgisi-model';

@Component({
  selector: '[app-aktif-ihale-arac-notification]',
  templateUrl: './aktif-ihale-arac-notification.component.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  styleUrls: ['./aktif-ihale-arac-notification.component.scss']
})
export class AktifIhaleAracNotificationComponent extends Toast implements OnInit, AfterViewInit, OnDestroy {
  public get eskiArac(): boolean {
    let buYil = new Date().getFullYear();
    if (new Date().getMonth() <= 6) {
      buYil--;
    }
    return this.aktifArac && this.aktifArac.aracYili < buYil;
  }
  tumAraclar: IhaleAracListeDTO[];
  @Input() aktifArac: IhaleTeklifVerilenAracDTO;
  sayfadakiAracId: string;
  ihaleSayfalamaBilgisi: IhaleSayfalamaBilgisi;
  subscriptions: Subscription[] = [];

  constructor(
    private ihaleService: IhaleService,
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.subscriptions.push(this.ihaleService.getAraclarFromCache(this.aktifArac.ihaleBilgisiId)
      .subscribe(s => {
        this.ihaleSayfalamaBilgisi = this.ihaleService.getSayfalamaBilgisi(this.aktifArac.id, s);
      }));
  }
  ngOnDestroy(): void {
    for (const element of this.subscriptions) {
      element.unsubscribe();
    }
  }
}
