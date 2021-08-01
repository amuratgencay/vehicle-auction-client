import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { Subscription } from 'rxjs';
import { IhaleTeklifSayacComponent } from './ihale-teklif-sayac/ihale-teklif-sayac.component';
import { IhaleTeklifSesComponent } from './ihale-teklif-ses/ihale-teklif-ses.component';
import {
  IhaleAracListeDTO, IhaleBilgisiListeDTO, IhaleTeklifVerildi, UyeBilgiDTO,
  IhaleService, UyeBilgiService, AuthServiceExtended, IhaleTeklifServiceExtended, IhaleAracDurum, IhaleAracServiceExtended, IhaleTeklifVerildiDTO
} from '@zyazilim/online-ihale-data';
import { TokenModel } from '@zyazilim/online-ihale-data/lib/modeller/security/token-model';

@Component({
  selector: 'app-ihale-teklif',
  templateUrl: './ihale-teklif.component.html',
  styleUrls: ['./ihale-teklif.component.scss']
})
export class IhaleTeklifComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(IhaleTeklifSayacComponent) sayacComponent: IhaleTeklifSayacComponent;
  @ViewChild(IhaleTeklifSesComponent) sesComponent: IhaleTeklifSesComponent;
  @Input() ihaleAracId: string;
  @Input() ihaleArac: IhaleAracListeDTO;
  @Input() ihale: IhaleBilgisiListeDTO;
  // @Input() aracDurumId: number;

  @Output() benzerAraclaraGitDegisti: EventEmitter<any> = new EventEmitter();
  sonTeklif: IhaleTeklifVerildiDTO;
  sonArtis: any;
  ihaleTeklifGeriSayim$: Subscription;
  teklifYapildi$: Subscription;
  baslangicSesiCalindi: boolean;
  otomatikGec: boolean;
  ihaleSonaErdiMi: boolean;
  teklifeKapandi$: Subscription;
  teklifGeldi: boolean;
  teklifGeldi$: Subscription;
  teklifYazisiGoster: boolean;
  aracDegisti$: Subscription;
  uyeBilgi: UyeBilgiDTO;
  hedefFiyatDegisti$: Subscription;
  kazananUyeId: string;


  public get ihaleyiGuncelUyeMiKazandi(): boolean {
    return this.user && this.user.userId === this.kazananUyeId;
  }
  public get user(): TokenModel {
    return this.authService.getToken();
  }
  public get hedefFiyat(): number {
    return this.ihaleArac ? this.ihaleArac.hedefFiyat : null;
  }
  public get kesinSatis(): boolean {
    return !this.hedefFiyat || (this.sonTeklif && this.sonTeklif.artirimSonrasiFiyat >= this.hedefFiyat);
  }
  public get sonTeklifGuncelUyedeMi(): boolean {
    return this.sonTeklif && this.user && this.sonTeklif.uyeBilgiId === this.user.userId;
  }
  constructor(private ihaleTeklifService: IhaleTeklifServiceExtended,
    private ihaleService: IhaleService,
    private modalService: NgbModal,
    private ihaleAracService: IhaleAracServiceExtended,
    private uyeBilgiService: UyeBilgiService,
    private authService: AuthServiceExtended,
    private _cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.aracDegisti$ = this.ihaleService.aracDegisti().subscribe(d => {
      if (d.id === this.ihaleAracId) {
        this.getData();
      }
    });
    this.hedefFiyatDegisti$ = this.ihaleAracService.hedefFiyatDegisti().subscribe(d => {
      this.ihaleArac.hedefFiyat = d;
      this.sesComponent && this.sesComponent.sayacSes.pause();
    });
    if (this.user) {
      this.uyeBilgiGetir();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.unsubscribes();
    this.sonTeklif = null;
    if (changes.ihaleAracId && changes.ihaleAracId.previousValue !== changes.ihaleAracId.currentValue) {
      this.getData();
    }
    // if (changes.aracDurumId && changes.aracDurumId.previousValue !== changes.aracDurumId.currentValue) {
    //   this.ihaleArac.ihaleDurum = IhaleAracDurumEnum[IhaleAracDurumEnum[this.aracDurumId]];
    // }
  }
  private getData() {
    this.ihaleTeklifService.getSonTeklif(this.ihaleAracId)
      .subscribe(s => {
        if (s) {
          this.sonTeklif = s;
        }
      });
    this.ihaleAracService.get(this.ihaleAracId).subscribe(arac => {
      this.ihaleArac = arac;
      this.ihaleSonaErdiMi = this.ihaleArac.ihaleDurum === IhaleAracDurum.Satildi
        || this.ihaleArac.ihaleDurum === IhaleAracDurum.Satilmadi;
      this.kazananUyeId = this.ihaleArac.kazananUyeId;
      if (this.ihaleArac.ihaleDurum === IhaleAracDurum.TeklifAliniyor) {
        this.teklifYapildi();
        this.teklifeKapandi$ = this.ihaleTeklifService.teklifeKapandi()
          .subscribe(d => {
            if (this.ihaleAracId === d.id) {
              this.ihaleSonaErdiMi = true;
              this.kazananUyeId = d.kazananUyeId;
            }
          });
        this.teklifGeldi$ = this.ihaleTeklifService.teklifGeldi()
          .subscribe(d => {
            if (this.ihaleAracId === d.ihaleAracId) {
              this.teklifGeldi = true;
            }
          });
      }
    });
  }
  zaman: number;
  teklifTimeout;
  geriSayimTimeout;
  teklifYapildi() {
    this.teklifYapildi$ = this.ihaleTeklifService.teklifYapildi().subscribe(data => {
      this.sonTeklif = data;
      this.zaman = Date.now();
      this.teklifYazisiGoster = true;
      if (this.geriSayimTimeout) {
        clearTimeout(this.geriSayimTimeout);
      }
      this.geriSayimTimeout = setTimeout(() => {
        this.teklifYazisiGoster = false;
        clearTimeout(this.geriSayimTimeout);
      }, 1000);
      this.sesComponent.teklifSesiCal(this.sonTeklif.artirimMiktari === this.ihale.teklifArtisButton6);
      this._cd.detectChanges();
      if (this.teklifTimeout) {
        clearTimeout(this.teklifTimeout);
      }
      this.teklifTimeout = setTimeout(() => {
        this.teklifGeldi = false;
        clearTimeout(this.teklifTimeout);
        this._cd.detectChanges();
      }, 400);
    });
  }



  login() {
    let modal = this.modalService.open(LoginComponent, { centered: true })
    modal.result.then(() => {
    }, () => {
    });
  }
  ngOnDestroy(): void {
    this.unsubscribes();
    this.ihaleTeklifService.sayfadakiAracId = null;
    this.hedefFiyatDegisti$ && this.hedefFiyatDegisti$.unsubscribe();
  }
  private unsubscribes() {
    this.ihaleTeklifGeriSayim$ && this.ihaleTeklifGeriSayim$.unsubscribe();
    this.teklifYapildi$ && this.teklifYapildi$.unsubscribe();
    this.teklifeKapandi$ && this.teklifeKapandi$.unsubscribe();
    this.teklifGeldi$ && this.teklifGeldi$.unsubscribe();
  }

  benzerAraclaraGit(tip) {
    this.benzerAraclaraGitDegisti.next(tip);
  }
  kesinSatisaGec() {
    this.ihaleAracService.putSatisaGecir(this.ihaleAracId)
      .subscribe(() => {

      });
  }
  private uyeBilgiGetir() {
    this.uyeBilgiService.get(this.user.userId)
      .subscribe(d => {
        this.uyeBilgi = d;
      });
  }

}
