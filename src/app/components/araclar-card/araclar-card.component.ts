import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ScrollTopService } from '../scroll-top/scroll-top.service';
import { IhaleAracListeDTO, IhaleBilgisiListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-araclar-card',
  templateUrl: './araclar-card.component.html',
  styleUrls: ['./araclar-card.component.scss']
})
export class AraclarCardComponent implements OnInit, OnChanges {
  turuncu = '#e84c0f';
  @Input() araclar: IhaleAracListeDTO[];
  @Input() aktifIhale: IhaleBilgisiListeDTO;
  order: { key?: string, reverse?: boolean } = { key: 'ihaleSirasi' };
  sayfalama: { itemsPerPage?: number, currentPage?: number, totalItems?: number } = { itemsPerPage: 9, currentPage: 1 };
  constructor(
    protected scrollTopService: ScrollTopService,
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sayfalama.totalItems = this.araclar ? this.araclar.length : 0;
  }

  siralamaDegistir(key) {
    if (this.order.key === key) {
      if (this.order.reverse) {
        this.order.key = 'ihaleSirasi';
        this.order.reverse = false;
      } else {
        this.order.reverse = !this.order.reverse;
        this.order.key = key;
      }
    } else {
      this.order.key = key;
      this.order.reverse = false;
    }
  }
  sayfaDegisti(e) {
    this.sayfalama.currentPage = e;
    this.scrollTopService.scrollToTop();
  }
}
