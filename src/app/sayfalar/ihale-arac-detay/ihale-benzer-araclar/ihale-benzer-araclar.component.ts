import { Component, OnInit, Input } from '@angular/core';
import { IhaleAracService, IhaleAracListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-ihale-benzer-araclar',
  templateUrl: './ihale-benzer-araclar.component.html',
  styleUrls: ['./ihale-benzer-araclar.component.scss']
})
export class IhaleBenzerAraclarComponent implements OnInit {
  @Input() aracId;
  @Input() ihaleId;
  satilmisCols = [
    {
      field: 'aracYili',
      title: 'Model Yılı',
      type: ''
    },
    {
      field: 'aracRenkAd',
      title: 'Renk',
      type: ''
    },
    {
      field: 'aracSonKm',
      title: 'Kilometre',
      type: 'number'
    },
    {
      field: 'satisTarihi',
      title: 'Satış Tarihi',
      type: ''
    },
    {
      field: 'baslangicFiyati',
      title: 'Başlangıç',
      type: 'currency'
    },
    {
      field: 'kapanis',
      title: 'Kapanış',
      type: ''
    }
  ];
  ihaledekiCols = [
    {
      field: 'aracYili',
      title: 'Model Yılı',
      type: ''
    },
    {
      field: 'aracRenkAd',
      title: 'Renk',
      type: ''
    },
    {
      field: 'aracSonKm',
      title: 'Kilometre',
      type: 'number'
    },
    {
      field: 'satisTarihi',
      title: 'Satış Tarihi',
      type: ''
    },
    {
      field: 'baslangicFiyati',
      title: 'Başlangıç',
      type: 'currency'
    },
    {
      field: 'kapanis',
      title: 'Kapanış',
      type: ''
    }
  ]
  @Input() secili: 'ihaledeki' | 'satilmis' = 'ihaledeki';
  satilmisBenzerAraclar: IhaleAracListeDTO[];
  ihaledekiBenzerAraclar: IhaleAracListeDTO[];
  constructor(private ihaleAracService: IhaleAracService) { }

  ngOnInit() {
    this.seciliDegistir(this.secili);
  }
  seciliDegistir(secili) {
    this.secili = secili;
    if (this.secili === 'ihaledeki') {
      this.ihaleAracService.getIhaledekiBenzerAraclar(this.aracId, this.ihaleId)
        .subscribe(data => {
          this.ihaledekiBenzerAraclar = data;
        });
    } else {
      this.ihaleAracService.getSatilmisBenzerAraclar(this.aracId)
        .subscribe(data => {
          this.satilmisBenzerAraclar = data;
        });
    }
  }
}
