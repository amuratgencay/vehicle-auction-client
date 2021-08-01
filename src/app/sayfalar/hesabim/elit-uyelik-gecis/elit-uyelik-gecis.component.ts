import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../../../components/bilgi-modal/bilgi-modal.component';
import { UyeBilgiService, ElitUyelikTalebiDTO, AuthServiceExtended, UyeBilgiDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-elit-uyelik-gecis',
  templateUrl: './elit-uyelik-gecis.component.html',
  styleUrls: ['./elit-uyelik-gecis.component.scss']
})
export class ElitUyelikGecisComponent implements OnInit {
  uyeBilgi: UyeBilgiDTO;

  constructor(private authService: AuthServiceExtended,
    private modal: NgbModal,
    private uyeBilgiService: UyeBilgiService) { }

  ngOnInit() {
    this.uyeBilgiService.get(this.authService.getToken().userId)
      .subscribe(data => {
        this.uyeBilgi = data;
      });
  }
  talepOlustur() {
    if (this.uyeBilgi.uyelikTipi === 1) {
      let modalInstance = this.modal.open(BilgiModalComponent, { centered: true }).componentInstance as BilgiModalComponent;
      modalInstance.butonMetin = 'TAMAM';
      modalInstance.icerik = 'Elite Üyeliğiniz Mevcuttur.';
      modalInstance.ustBaslik = 'Bilgi';
    }
    else {
      let dto = new ElitUyelikTalebiDTO();
      dto.uyeBilgiId = this.authService.getToken().userId;
      this.uyeBilgiService.postElitUyelikTalebi(this.authService.getToken().userId, dto)
        .subscribe(res => {
          if (res.id) {
            let modalInstance = this.modal.open(BilgiModalComponent, { centered: true }).componentInstance as BilgiModalComponent;
            modalInstance.butonMetin = 'TAMAM';
            modalInstance.icerik = 'Elite Üyelik Talebiniz Alınmıştır.';
            modalInstance.ustBaslik = 'Bilgi';
          }
        });
    }

  }

}
