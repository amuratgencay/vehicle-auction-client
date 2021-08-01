import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { KarsilastiriciService } from '../servisler/karsilastirici.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FavoriIlanListeDTO } from '@zyazilim/online-ihale-data';
@Component({
  selector: 'app-arac-karsilastir',
  templateUrl: './arac-karsilastir.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./arac-karsilastir.component.scss']
})
export class AracKarsilastirComponent implements OnInit, OnDestroy {
  secilenAraclar: FavoriIlanListeDTO[];
  sub$: Subscription;

  constructor(private karsilastirmaService: KarsilastiriciService,
    public modalRef: NgbActiveModal) { }

  ngOnInit() {
    this.secilenAraclar = this.karsilastirmaService.secilenAraclar;
    if (this.secilenAraclar.length === 0) {
      this.modalRef.dismiss();
    }
    this.sub$ = this.karsilastirmaService.secilenAraclarDegisti.subscribe(res => {
      this.secilenAraclar = res;
      if (this.secilenAraclar.length === 0) {
        this.modalRef.dismiss();
      }
    });
  }
  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
  cikar(arac: FavoriIlanListeDTO) {
    this.karsilastirmaService.cikar(arac);
  }
  drop(event: CdkDragDrop<FavoriIlanListeDTO[]>) {
    moveItemInArray(this.secilenAraclar, event.previousIndex, event.currentIndex);
  }
}
