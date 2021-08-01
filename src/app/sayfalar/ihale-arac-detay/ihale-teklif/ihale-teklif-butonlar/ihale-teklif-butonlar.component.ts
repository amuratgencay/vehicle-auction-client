import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../../../../components/bilgi-modal/bilgi-modal.component';
import { Subscription } from 'rxjs';
import { IhaleTeklifGeriSayim, IhaleTeklifServiceExtended, AuthServiceExtended, TokenDTO, IhaleTeklifVerDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: '[app-ihale-teklif-butonlar]',
  templateUrl: './ihale-teklif-butonlar.component.html',
  styleUrls: ['./ihale-teklif-butonlar.component.scss']
})
export class IhaleTeklifButonlarComponent implements OnInit, OnDestroy {

  @Input() teklifArtisButton1: number;
  @Input() teklifArtisButton2: number;
  @Input() teklifArtisButton3: number;
  @Input() teklifArtisButton4: number;
  @Input() teklifArtisButton5: number;
  @Input() teklifArtisButton6: number;
  @Input() sonArtis: number;
  @Input() sonTeklifGuncelUyedeMi: boolean;
  @Input() teklifGeldi: boolean;
  @Input() sonTeklifId: string;
  @Input() ihaleAracId: string;
  @Input() satisBarajiGecildiMi: boolean;
  teklifGeriSayim: IhaleTeklifGeriSayim;
  ihaleTeklifGeriSayim$: Subscription;
  public get user(): TokenDTO {
    return this.authService.getToken();
  }
  public get buttonlarKapali(): boolean {
    return this.teklifGeldi || !this.user || (this.sonTeklifGuncelUyedeMi && this.satisBarajiGecildiMi) || (this.teklifGeriSayim && this.teklifGeriSayim.k <= 0.15);
  }
  constructor(
    private authService: AuthServiceExtended,
    private modalService: NgbModal,
    private ihaleTeklifService: IhaleTeklifServiceExtended) { }

  ngOnInit() {
  }
  geriSayim() {
    this.ihaleTeklifGeriSayim$ = this.ihaleTeklifService.ihaleTeklifGeriSayim().subscribe(data => {
      this.teklifGeriSayim = data;
    });
  }
  teklifVer(artisMiktari) {
    if (this.teklifGeldi) {
      return;
    }
    this.teklifGeldi = true;
    this.sonArtis = artisMiktari;
    this.ihaleTeklifService.post(new IhaleTeklifVerDTO({ artirimMiktari: artisMiktari, ihaleAracId: this.ihaleAracId, sonTeklifId: this.sonTeklifId }))
      .subscribe(() => {
      }, err => {
        this.teklifGeldi = false;
        // if (err.error && err.error.message === 'Teklif verebilmek için lütfen bakiye yükleyiniz.') {
        //   let modalRef = this.modalService.open(BilgiModalComponent, { centered: true });
        //   (modalRef.componentInstance as BilgiModalComponent).icerik = 'Teklif verebilmek için lütfen bakiye yükleyiniz.';
        //   (modalRef.componentInstance as BilgiModalComponent).altBaslik = 'Bakiye yetersiz!';
        //   (modalRef.componentInstance as BilgiModalComponent).ustBaslik = 'Bilgi';
        //   (modalRef.componentInstance as BilgiModalComponent).butonMetin = 'Tamam';
        // }
      });
  }
  ngOnDestroy(): void {
    this.ihaleTeklifGeriSayim$ && this.ihaleTeklifGeriSayim$.unsubscribe();
  }
}
