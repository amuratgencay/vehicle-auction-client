import { Component, OnInit, ChangeDetectorRef, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IhaleBittiModalComponent } from '../ihale-bitti-modal/ihale-bitti-modal.component';
import { IhaleBilgisiGeriSayim, IhaleTeklifVerilenAracDTO, IhaleSayfalamaBilgisi, IhaleService, IhaleAracService, IhaleBilgisiListeDTO } from '@zyazilim/online-ihale-data';
import { IhaleBilgisiAktifOldu } from '@zyazilim/online-ihale-data/lib/modeller/ihale-bilgisi-aktif-oldu.model';
@Component({
  selector: 'app-geri-sayim',
  templateUrl: './geri-sayim.component.html',
  styleUrls: ['./geri-sayim.component.scss']
})
export class GeriSayimComponent implements OnInit, OnDestroy {

  ihale: IhaleBilgisiGeriSayim;
  ihaleAktif: IhaleBilgisiListeDTO;
  aktifArac: IhaleTeklifVerilenAracDTO;
  touchedTop: boolean;
  subscriptions: Subscription[] = [];
  ihaleSayfalamaBilgisi: IhaleSayfalamaBilgisi;
  // @ViewChild('geriSayim', { static: true }) element:
  constructor(private ihaleService: IhaleService,
    private ihaleAracService: IhaleAracService,
    private modal: NgbModal,
    private changeDedector: ChangeDetectorRef,
    private hostElement: ElementRef) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.hostElement) {
      this.touchedTop = (this.hostElement.nativeElement.getBoundingClientRect().y - 37.5) <= 0;
    }
  }
  ngOnInit() {
    this.subscriptions.push(this.ihaleService.getAktifIhale().subscribe(d => {
      this.ihaleAktif = d;
    }));
    this.subscriptions.push(this.ihaleAracService.getTeklifVerilenArac().subscribe(d => {
      this.aktifArac = d;
      this.getSayfalama();
    }));
    this.subscriptions.push(this.ihaleService.ihaletimer().subscribe(data => {
      this.ihale = data;
      this.changeDedector.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.ihaleAktifOldu().subscribe(data => {
      this.ihale = null;
      this.ihaleAktif = new IhaleBilgisiListeDTO(data)
      this.changeDedector.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.ihaleKapandi().subscribe(data => {
      this.ihaleAktif = null;
      this.aktifArac = null;
      this.ihale = null;
      let modalRef = this.modal.open(IhaleBittiModalComponent, { centered: true });
      (modalRef.componentInstance as IhaleBittiModalComponent).kapananIhale = data;
      this.changeDedector.detectChanges();
    }));
    this.subscriptions.push(this.ihaleService.aracDegisti().subscribe(data => {
      this.aktifArac = data;
      this.getSayfalama();
      this.changeDedector.detectChanges();
    }));

  }
  private getSayfalama() {
    if (this.aktifArac) {
      this.subscriptions.push(this.ihaleService.getAraclarFromCache(this.aktifArac.ihaleBilgisiId)
        .subscribe(s => {
          this.ihaleSayfalamaBilgisi = this.ihaleService.getSayfalamaBilgisi(this.aktifArac.id, s);
        }));
    }
  }

  ngOnDestroy(): void {
    this.changeDedector.detach();
    for (const element of this.subscriptions) {
      element.unsubscribe();
    }
  }
}
