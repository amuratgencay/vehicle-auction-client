import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AracEkspertizGecmisiDTO, AracService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-arac-ekspertiz-gecmisi',
  templateUrl: './arac-ekspertiz-gecmisi.component.html',
  styleUrls: ['./arac-ekspertiz-gecmisi.component.scss']
})
export class AracEkspertizGecmisiComponent implements OnInit, OnChanges {

  @Input() aracId: string;
  @Input() showInModal: boolean;
  mapClassToParca = [
    { parca: '', class: ['arkaaltbagaj'] },
    { parca: 'Bagaj Kapağı', class: ['arkabagaj', 'arkaaltbagaj'] },
    { parca: 'Sağ Arka Çamurluk', class: ['arkasagcamurluk'] },
    { parca: 'Sağ Arka Kapı', class: ['arkasagkapi'] },
    { parca: '', class: ['arkasagtampon'] },
    { parca: 'Sol Arka Çamurluk', class: ['arkasolcamurluk'] },
    { parca: 'Sol Arka Kapı', class: ['arkasolkapi'] },
    { parca: '', class: ['arkasoltampon'] },
    { parca: 'Arka Tampon', class: ['arkatampon', 'arkasagtampon', 'arkasoltampon'] },
    { parca: '', class: ['arkaustbagaj'] },
    { parca: 'Kaput', class: ['onkaput'] },
    { parca: 'Sağ Ön Çamurluk', class: ['onsagcamurluk'] },
    { parca: 'Sağ Ön Kapı', class: ['onsagkapi'] },
    { parca: '', class: ['onsagtampon'] },
    { parca: 'Sol Ön Çamurluk', class: ['onsolcamurluk'] },
    { parca: 'Sol Ön Kapı', class: ['onsolkapi'] },
    { parca: '', class: ['onsoltampon'] },
    { parca: 'Ön Tampon', class: ['ontampon', 'onsoltampon', 'onsagtampon'] },
    { parca: 'Tavan', class: ['tavan'] }
  ]
  ekspertizGecmisi: AracEkspertizGecmisiDTO[];
  boyaliParcalar: AracEkspertizGecmisiDTO[];
  degisenParcalar: AracEkspertizGecmisiDTO[];
  constructor(private aracService: AracService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
  getClassName(parcaAd) {
    let parca = this.mapClassToParca.find(p => p.parca === parcaAd);
    return parca ? parca.class : '';
  }
  getData() {
    this.aracService.getAracEkspertizGecmisi(this.aracId).subscribe(data => {
      this.ekspertizGecmisi = data;
      this.boyaliParcalar = data.filter(p => p.parcaBoyali === true);
      this.degisenParcalar = data.filter(p => p.parcaDegismis === true);
    });
  }
}
