import { Component, OnInit } from '@angular/core';
import { IhaleAracListeDTO, UyeBilgiService, AuthServiceExtended, TokenDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-hemen-aldiklarim',
  templateUrl: './hemen-aldiklarim.component.html',
  styleUrls: ['./hemen-aldiklarim.component.scss']
})
export class HemenAldiklarimComponent implements OnInit {
  columns: { field: string; title: string; cellClass?: string; type?: string; }[];
  user: TokenDTO;
  data: IhaleAracListeDTO[];

  constructor(private uyeBilgiService: UyeBilgiService, private authService: AuthServiceExtended) {
    this.user = this.authService.getToken();
    if (this.user) {
      this.uyeBilgiService.getHemenAldiklarim(this.user.userId)
        .subscribe(d => {
          this.data = d;
        });
    }
    this.columns = [
      {
        field: 'aracPlaka',
        title: 'Plaka',
        cellClass: 'font-weight-medium'
      },
      {
        field: 'aracAracVersionModelMarkaAd',
        title: 'Marka',
        cellClass: 'font-weight-medium'
      },
      {
        field: 'aracAracVersionModelAd',
        title: 'Model'
      },
      {
        field: 'aracAracVersionAd',
        title: 'Versiyon'
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
        field: 'sonTeklifZamani',
        title: 'Tarih',
        type: 'date'
      },
      {
        field: 'baslangicFiyati',
        title: 'Hemen Al Fiyatı',
        type: 'currency'
      },
      {
        field: 'kazanilanFiyat',
        title: 'Alış fiyatı',
        type: 'currency'
      }
    ];

  }

  ngOnInit() {
  }

}
