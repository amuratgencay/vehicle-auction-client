import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BakiyeYukleComponent } from '../bakiye-yukle/bakiye-yukle.component';
import { LoginComponent } from '../../sayfalar/login/login.component';
import {
  UyeBilgiDTO, IhaleBilgisiListeDTO,
  IhaleAracListeDTO, IhaleBilgisiGeriSayim, IhaleService,
  UyeBilgiServiceExtended, AuthServiceExtended, TokenDTO
} from '@zyazilim/online-ihale-data';
import { IhaleBilgisiAktifOldu } from '@zyazilim/online-ihale-data/lib/modeller/ihale-bilgisi-aktif-oldu.model';
@Component({
  selector: 'app-firsat-araci-card',
  templateUrl: './firsat-araci-card.component.html',
  styleUrls: ['./firsat-araci-card.component.scss']
})
export class FirsatAraciCardComponent implements AfterViewInit, OnDestroy {
  uyeBilgi: UyeBilgiDTO;
  public get eskiArac(): boolean {
    let buYil = new Date().getFullYear();
    if (new Date().getMonth() <= 6) {
      buYil--;
    }
    return this.firsatAraci && this.firsatAraci.aracYili < buYil;
  }
  public get user(): TokenDTO {
    return this.authService.getToken();
  }
  faTachometerAlt = faTachometerAlt;
  enYakinIhale: IhaleBilgisiListeDTO;
  firsatAraclari: IhaleAracListeDTO[];
  firsatAraci: IhaleAracListeDTO;
  ihale: IhaleBilgisiGeriSayim;
  ihaleAktif: IhaleBilgisiListeDTO;
  aktifArac: any;
  subscriptions: Subscription[] = [];
  constructor(private ihaleService: IhaleService,
    private uyeBilgiService: UyeBilgiServiceExtended,
    private authService: AuthServiceExtended,
    private modal: NgbModal,
    private _cd: ChangeDetectorRef) { }

  ngOnInit() {

  }
  bakiyeYukle() {
    const modal = this.modal.open(BakiyeYukleComponent, { centered: true });
    modal.result.then(() => {
    }, () => {
    });
  }
  ngAfterViewInit(): void {
    this.subscriptions.push(this.authService.onAuthenticationChange().subscribe(t => {
      if (t) {
        this.uyeBilgiGetir();
      } else {
        this.uyeBilgi = null;
      }
    }));
    this.subscriptions.push(this.ihaleService.getEnYakinVeyaAktifIhale()
      .subscribe(i => {
        this.enYakinIhale = i;
        if (this.enYakinIhale) {
          this.subscriptions.push(this.ihaleService.getFirsatAraclari(this.enYakinIhale.id)
            .subscribe(d => {
              this.firsatAraclari = d;
              this.firsatAraci = d[0];
            }));
        }
      }));
    this.geriSayim();
    this.uyeBilgiGetir();
  }
  geriSayim() {
    this.subscriptions.push(this.ihaleService.ihaletimer().subscribe(data => {
      this.ihale = data;
      this._cd.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.ihaleAktifOldu().subscribe(data => {
      this.ihaleAktif = data;
      this._cd.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.ihaleKapandi().subscribe(() => {
      this.ihaleAktif = null;
      this.aktifArac = null;
      this._cd.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.aracDegisti().subscribe(data => {
      this.aktifArac = data;
      this._cd.detectChanges();
    }));
  }
  ngOnDestroy(): void {
    this._cd.detach();
    for (let i = 0; i < this.subscriptions.length; i++) {
      const element = this.subscriptions[i];
      element.unsubscribe();
    }
  }
  private uyeBilgiGetir() {
    if (this.user) {
      this.uyeBilgiService.get(this.user.userId)
        .subscribe(d => {
          this.uyeBilgi = d;
        });
    } else {
      this.uyeBilgi = null;
    }
  }
  login() {
    const modal = this.modal.open(LoginComponent, { centered: true });
    modal.result.then(() => {
    }, () => {
    });
  }
}
