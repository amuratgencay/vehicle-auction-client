import { Component, OnInit } from '@angular/core';
import { IhaleAracListeDTO, UyeBilgiService, AuthService, TokenDTO, AuthServiceExtended } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-kazandigim-ihaleler',
  templateUrl: './kazandigim-ihaleler.component.html',
  styleUrls: ['./kazandigim-ihaleler.component.scss']
})
export class KazandigimIhalelerComponent implements OnInit {
  columns: { field: string; title: string; cellClass?: string; type?: string; }[];
  user: TokenDTO;
  data: IhaleAracListeDTO[];

  constructor(private uyeBilgiService: UyeBilgiService, private authService: AuthServiceExtended) {
    this.user = this.authService.getToken();
    if (this.user) {
      this.uyeBilgiService.getKazandigimIhaleler(this.user.userId)
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
        title: 'Başlangıç',
        type: 'currency'
      },
      {
        field: 'kazanilanFiyat',
        title: 'Kapanış',
        type: 'currency'
      }
    ];

  }

  ngOnInit() {
  }

}
