import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { saveAs as importedSaveAs } from 'file-saver';
import {
  AracParcaMevcutDurumDTO, AracParcaDTO, AracListeDTO,
  AracEkspertizRaporuDTO, AracService, DokumanService, AracParcaService
} from '@zyazilim/online-ihale-data';
@Component({
  selector: 'app-arac-mevcut-durum',
  templateUrl: './arac-mevcut-durum.component.html',
  styleUrls: ['./arac-mevcut-durum.component.scss']
})
export class AracMevcutDurumComponent implements OnInit, OnChanges {
  @Input() aracId: string;
  mevcutDurum: AracParcaMevcutDurumDTO[];
  parcalar: AracParcaDTO[];
  arac: AracListeDTO;
  ekspertizRaporlari: AracEkspertizRaporuDTO[];
  constructor(private aracService: AracService,
    private dokumanService: DokumanService,
    private parcaService: AracParcaService) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
  getData() {
    this.parcaService.getAll()
      .subscribe(parcalar => {
        this.parcalar = parcalar;
        this.aracService.getAracParcaMevcutDurumlari(this.aracId).subscribe(data => {
          this.mevcutDurum = data.filter(f => f.cizikBuyuk || f.cizikKucuk || f.hasarAgir || f.hasarHafif);
          this.parcalar = this.parcalar.filter(p => this.mevcutDurum.map(m => m.aracParcaId).indexOf(p.id) > -1)
        });
        this.aracService.getAracEkspertizRaporu(this.aracId).subscribe(data => {
          this.ekspertizRaporlari = data;
        });
      });

    this.aracService.get(this.aracId)
      .subscribe(d => {
        this.arac = d;
      });
  }
  parcayaGoreGetir(parca: AracParcaDTO): AracParcaMevcutDurumDTO {
    const parcaDurum = this.mevcutDurum ? this.mevcutDurum.find(f => f.aracParcaId === parca.id) : null;
    return parcaDurum;
  }
  indir() {
    if (this.ekspertizRaporlari && this.ekspertizRaporlari.length) {
      this.dokumanService.download(this.ekspertizRaporlari[0].dosyaId)
        .subscribe(d => {
          importedSaveAs(d.data, this.ekspertizRaporlari[0].dosyaAd);
          // if (window) {
          //   window.open(d.url);
          // }
        });
    }
  }
}
