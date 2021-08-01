import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginComponent } from '../../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../../../components/bilgi-modal/bilgi-modal.component';
import {
  HemenAlService,
  UyeBilgiService, HemenAlSatinAlDTO, AuthServiceExtended, TokenDTO, IhaleAracListeDTO, IhaleAracDurum, UyeBilgiDTO
} from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-ihale-arac-hemen-al',
  templateUrl: './ihale-arac-hemen-al.component.html',
  styleUrls: ['./ihale-arac-hemen-al.component.scss']
})
export class IhaleAracHemenAlComponent implements OnInit {

  @Input() ihaleArac: IhaleAracListeDTO;
  @Input() kazananUyeId: string;
  @Output() benzerAraclaraGitDegisti: EventEmitter<any> = new EventEmitter();
  uyeBilgi: UyeBilgiDTO;
  get ihaleSonaErdiMi() {
    return this.ihaleArac && (this.ihaleArac.ihaleDurum === IhaleAracDurum.Satildi
      || this.ihaleArac.ihaleDurum === IhaleAracDurum.Satilmadi);
  }
  public get ihaleyiGuncelUyeMiKazandi(): boolean {
    return this.user && this.user.userId === this.kazananUyeId;
  }
  constructor(private modalService: NgbModal,
    private hemenAlService: HemenAlService,
    private authService: AuthServiceExtended,
    private uyeBilgiService: UyeBilgiService,

  ) { }
  public get user(): TokenDTO {
    return this.authService.getToken();
  }
  ngOnInit() {
    if (this.user) {
      this.uyeBilgiGetir();
    }
  }
  private uyeBilgiGetir() {
    this.uyeBilgiService.get(this.user.userId)
      .subscribe(d => {
        this.uyeBilgi = d;
      });
  }
  login() {
    let modal = this.modalService.open(LoginComponent, { centered: true })
    modal.result.then(() => {
    }, () => {
    });
  }
  benzerAraclaraGit(tip) {
    this.benzerAraclaraGitDegisti.next(tip);
  }
  hemenAl() {
    let modalRef = this.modalService.open(BilgiModalComponent, { centered: true });
    (modalRef.componentInstance as BilgiModalComponent).icerik = this.uyeBilgi.uyelikTipi === 1 ? '' : 'Satın alma işleminin ardından depozito bedeli bakiyenizden düşülecektir.';
    (modalRef.componentInstance as BilgiModalComponent).ustBaslik = 'Onay';
    (modalRef.componentInstance as BilgiModalComponent).altBaslik = 'Hemen al işlemini onaylıyor musunuz?';
    (modalRef.componentInstance as BilgiModalComponent).butonMetin = 'TAMAM';
    modalRef.result.then(s => {
      if (s) {
        this.hemenAlService.postSatinAl(this.ihaleArac.id, new HemenAlSatinAlDTO({ uyeBilgiId: this.user.userId, ihaleAracId: this.ihaleArac.id }))
          .subscribe((d) => {
            this.ihaleArac = d;
            this.kazananUyeId = d.kazananUyeId;
          }, err => {
            // if (err.error && err.error.message === 'Teklif verebilmek için lütfen bakiye yükleyiniz.') {
            //   let modalRef = this.modalService.open(BilgiModalComponent, { centered: true });
            //   (modalRef.componentInstance as BilgiModalComponent).icerik = 'Hemen almak için lütfen bakiye yükleyiniz.';
            //   (modalRef.componentInstance as BilgiModalComponent).altBaslik = 'Bakiye yetersiz!';
            //   (modalRef.componentInstance as BilgiModalComponent).ustBaslik = 'Bilgi';
            //   (modalRef.componentInstance as BilgiModalComponent).butonMetin = 'Tamam';
            // }
          });
      }
    }, () => {
    })
  }
}
