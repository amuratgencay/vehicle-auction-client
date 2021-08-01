import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IhaleAracListeDTO, IhaleBilgisiListeDTO, AracAraDTO, IhaleAracService, IhaleService, IAracAraDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-araclar',
  templateUrl: './araclar.component.html',
  styleUrls: ['./araclar.component.scss']
})
export class AraclarComponent implements OnInit, OnDestroy {

  aramaSonucu: IhaleAracListeDTO[];
  ihale: IhaleBilgisiListeDTO;
  tab: string;
  listeTipi = 'card';
  aramaKriter: IAracAraDTO = new AracAraDTO();
  eventSub$: Subscription;
  constructor(
    private ihaleAracService: IhaleAracService,
    private ihaleService: IhaleService,
    private activated: ActivatedRoute,
    private router: Router) {
    this.eventSub$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const params = this.activated.snapshot.params;
        const queryParams = this.activated.snapshot.queryParams;
        this.aramaKriter = { ...queryParams };
        if (typeof (this.aramaKriter.versiyonlar) === 'string') {
          this.aramaKriter.versiyonlar = [this.aramaKriter.versiyonlar];
        }
        if (typeof (this.aramaKriter.modeller) === 'string') {
          this.aramaKriter.modeller = [this.aramaKriter.modeller];
        }
        if (typeof (this.aramaKriter.vitesTipleri) === 'string') {
          this.aramaKriter.vitesTipleri = [this.aramaKriter.vitesTipleri];
        }
        if (typeof (this.aramaKriter.yakitTipleri) === 'string') {
          this.aramaKriter.yakitTipleri = [this.aramaKriter.yakitTipleri];
        }
        if (typeof (this.aramaKriter.markalar) === 'string') {
          this.aramaKriter.markalar = [this.aramaKriter.markalar];
        }
        this.tab = params.tab;
        if (params.tab === 'aktif') {
          this.ihaleService.getEnYakinVeyaAktifIhale().subscribe(d => {
            this.ihale = d;
            if (!this.ihale) {
              this.aramaSonucu = [];
              // this.router.navigate(['/araclar', 'biten'], { queryParamsHandling: 'merge' });
              return;
            }
            this.getData();
          });
        } else {
          this.getData();
        }
      });
  }

  private getData() {
    if (this.tab === 'aktif') {
      this.aramaKriter.ihaleBilgisiId = this.ihale.id;
    } else {
      this.aramaKriter.ihaleBilgisiId = undefined;
    }
    this.ihaleAracService.arama(new AracAraDTO(this.aramaKriter))
      .subscribe(res => {
        this.aramaSonucu = res.sort((a, b) => b.ihaleSirasi - a.ihaleSirasi);
        this.aramaKriter.markalar = [];
      });
  }

  ngOnInit() {
    this.tab = this.activated.snapshot.params.tab;
  }
  ngOnDestroy(): void {
    this.eventSub$.unsubscribe();
  }
}
