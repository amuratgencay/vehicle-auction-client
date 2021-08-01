import { Component, OnInit, OnDestroy } from '@angular/core';
import { KarsilastiriciService } from '../servisler/karsilastirici.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AracKarsilastirComponent } from '../arac-karsilastir/arac-karsilastir.component';
import { FavoriIlanListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-arac-karsilastirma-info',
  templateUrl: './arac-karsilastirma-info.component.html',
  styleUrls: ['./arac-karsilastirma-info.component.scss']
})
export class AracKarsilastirmaInfoComponent implements OnInit, OnDestroy {
  secilenAraclar: FavoriIlanListeDTO[];
  sub$: Subscription;

  constructor(private karsilastirmaService: KarsilastiriciService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.secilenAraclar = this.karsilastirmaService.secilenAraclar;
    this.sub$ = this.karsilastirmaService.secilenAraclarDegisti.subscribe(res => {
      this.secilenAraclar = res;
    });
  }
  karsilastir() {
    let modal = this.modalService.open(AracKarsilastirComponent, { centered: true, size: 'xl', windowClass: 'modal-adaptive' });
    modal.result.then(() => {
    }, (res) => {
    });
  }
  temizle() {
    this.karsilastirmaService.temizle();
  }
  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
