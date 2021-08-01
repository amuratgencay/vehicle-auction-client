import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { IhaleSayfalamaBilgisi, IhaleAracListeDTO, IhaleService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-ihale-sayfalama-bilgisi',
  templateUrl: './ihale-sayfalama-bilgisi.component.html',
  styleUrls: ['./ihale-sayfalama-bilgisi.component.scss']
})
export class IhaleSayfalamaBilgisiComponent implements OnInit, OnChanges, OnDestroy {

  yukleniyor = false;
  ihaleSayfalamaBilgisi: IhaleSayfalamaBilgisi;
  @Input() ihaleId: string;
  @Input() sayfadakiAracId: string;
  @Input() takipSayisi: number;
  ihaleArac: IhaleAracListeDTO;

  constructor(private ihaleService: IhaleService) {
  }
  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.ihaleId && this.sayfadakiAracId) {
      this.ihaleService.ihaleAraclariDegisti().subscribe(d => {
        this.getData();
      });
      this.getData();
    }
  }
  private getData() {
    if (!this.yukleniyor) {
      this.yukleniyor = true;
      this.ihaleService.getAraclarFromCache(this.ihaleId)
        .subscribe(d => {
          this.ihaleArac = d.find(p => p.id === this.sayfadakiAracId);
          this.ihaleSayfalamaBilgisi = this.ihaleService.getSayfalamaBilgisi(this.sayfadakiAracId, d);
          this.yukleniyor = false;
        })
    }
  }

  ngOnDestroy(): void {
  }
}
