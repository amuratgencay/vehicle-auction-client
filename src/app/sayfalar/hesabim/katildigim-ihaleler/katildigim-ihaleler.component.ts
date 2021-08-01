import { Component, OnInit } from '@angular/core';
import { UyeBilgiService, AuthServiceExtended, TokenDTO, IhaleAracKatildigimListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-katildigim-ihaleler',
  templateUrl: './katildigim-ihaleler.component.html',
  styleUrls: ['./katildigim-ihaleler.component.scss']
})
export class KatildigimIhalelerComponent implements OnInit {
  columns: { field: string; title: string; cellClass?: string; type?: string, getMessage?: any }[];
  user: TokenDTO;
  data: IhaleAracKatildigimListeDTO[];

  constructor(private uyeBilgiService: UyeBilgiService, private authService: AuthServiceExtended) {
    this.user = this.authService.getToken();
    if (this.user) {
      this.uyeBilgiService.getKatildigimIhaleler(this.user.userId)
        .subscribe(d => {
          this.data = d;
        });
    }
    this.columns = [
      {
        field: 'aracPlaka',
        title: 'Plaka'
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
        field: 'uyeSonTeklif',
        title: 'Teklifiniz',
        type: 'currency'
      },
      {
        field: 'kapanis',
        title: 'Kapanış',
        type: 'info',
        getMessage: (row: IhaleAracKatildigimListeDTO) => {
          // if (row.kazananUyeId !== this.user.userId) {
          //   return 'Araç farklı bir üye tarafından kazanılmıştır.'
          // } else {
          //   return row.kazanilanFiyat;
          // }
          return '';
        }
      }
    ];
  }

  ngOnInit() {
  }

}
