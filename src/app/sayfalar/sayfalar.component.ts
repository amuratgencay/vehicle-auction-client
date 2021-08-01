import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sayfalar',
  templateUrl: './sayfalar.component.html',
  styleUrls: ['./sayfalar.component.scss']
})
export class SayfalarComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    /* let modal = this.modalService.open(BilgiModalComponent, { centered: true });
    (modal.componentInstance as BilgiModalComponent).butonMetin = 'TAMAM';
    (modal.componentInstance as BilgiModalComponent).icerik = 'Elite Üyelik Talebiniz Alınmıştır.';
    (modal.componentInstance as BilgiModalComponent).ustBaslik = 'Bilgi';*/

  }

}
