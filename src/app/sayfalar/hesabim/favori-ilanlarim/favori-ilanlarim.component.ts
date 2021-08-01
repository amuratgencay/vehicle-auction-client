import { Component, OnInit } from '@angular/core';
import { RowAction, TableColumn } from '../../../components/table/table.component';
import { KarsilastiriciService } from '../servisler/karsilastirici.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../../../components/bilgi-modal/bilgi-modal.component';
import { FavoriIlanListeDTO, UyeBilgiService, AuthServiceExtended, IhaleAracListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-favori-ilanlarim',
  templateUrl: './favori-ilanlarim.component.html',
  styleUrls: ['./favori-ilanlarim.component.scss']
})
export class FavoriIlanlarimComponent implements OnInit {
  data: IhaleAracListeDTO[];
  columns: TableColumn[];
  actions: RowAction[];

  constructor(private uyeBilgiService: UyeBilgiService,
    private karsilastiriciService: KarsilastiriciService,
    private modal: NgbModal,
    private authService: AuthServiceExtended) {
    this.columns = [
      {
        field: 'aracAracVersionModelMarkaAd',
        title: 'Marka',
        cellClass: 'font-weight-medium',

      },
      {
        field: 'aracAracVersionModelAd',
        title: 'Model'
      },
      {
        field: 'aracAracVersionAd',
        title: 'Versiyon',

      },
      {
        field: 'yakitTipiAd',
        title: 'Yakıt'
      },
      {
        field: 'vitesTipiAd',
        title: 'Şanzıman'
      },
      {
        field: 'aracYili',
        title: 'Yıl'
      },
      {
        field: 'aracSonKm',
        title: 'Kilometre',
        type: 'number'
      },
      {
        field: 'baslangicFiyati',
        title: 'Başlangıç',
        type: 'currency'
      },
      {
        field: 'ihaleDurumAd',
        title: 'Durum',
      }
    ];
    const ekle = new RowAction('ekle', 'Karşılaştır', '', '', 'assets/special/karsilastirma-ekle.svg');
    ekle.show = (row) => {
      return !this.karsilastiriciService.listedeVarMi(row);
    }
    const cikar = new RowAction('cikar', 'Karşılaştır', '', '', 'assets/special/karsilastirma-eklendi.svg');
    cikar.show = (row) => {
      return this.karsilastiriciService.listedeVarMi(row);
    }
    this.actions = [ekle, cikar]
  }

  ngOnInit() {
    this.uyeBilgiService.getFavoriIlanlar(this.authService.getToken().userId)
      .subscribe(data => this.data = data.map(p => p.ihaleArac));
  }
  rowActionClicked(e: { action: RowAction, row: FavoriIlanListeDTO }) {
    if (e.action.key === 'ekle') {
      let sonuc = this.karsilastiriciService.ekle(e.row);
      if (!sonuc) {
        let modal = this.modal.open(BilgiModalComponent, { centered: true });
        (modal.componentInstance as BilgiModalComponent).butonMetin = 'TAMAM';
        (modal.componentInstance as BilgiModalComponent).unlemGoster = true;
        (modal.componentInstance as BilgiModalComponent).icerik = 'Maksimum karşılaştırabileceğiniz araç sayısı 3\'tür!';
      }
    } else if (e.action.key === 'cikar') {
      this.karsilastiriciService.cikar(e.row);
    }
  }
}
