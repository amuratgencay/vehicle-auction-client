import { Component, OnInit } from '@angular/core';
import { MarkayaGoreAracSayilariDTO, IhaleService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-arac-listesi-filtre',
  templateUrl: './arac-listesi-filtre.component.html',
  styleUrls: ['./arac-listesi-filtre.component.scss']
})
export class AracListesiFiltreComponent implements OnInit {
  markalar: MarkayaGoreAracSayilariDTO[];

  constructor(private ihaleService: IhaleService) { }

  ngOnInit() {
    this.ihaleService.getEnYakinVeyaAktifIhale()
      .subscribe(d => {
        if (d) {
          this.ihaleService.getMarkayaGoreAracSayilari(d.id)
            .subscribe(d => {
              if (d) {
                this.markalar = d;
              }
            });
        }
      });
  }
}
