import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rubberBand } from 'ng-animate/lib/attention-seekers';

@Component({
  selector: 'app-geri-sayim-test',
  templateUrl: './geri-sayim-test.component.html',
  styleUrls: ['./geri-sayim-test.component.scss'],

})
export class GeriSayimTestComponent implements OnInit {
  sonTeklif: number = 0;
  teklifSuresi: number = 30;
  uzatmaSuresi: number = 10;
  teklifSuresi2: number = 30;
  uzatmaSuresi2: number = 10;
  kalanZaman;
  teklifGeldi: boolean;

  public get zamanYuzde(): number {
    return (this.kalanZaman / (this.kalanZaman > this.uzatmaSuresi ? this.teklifSuresi : this.uzatmaSuresi)) * 100;
  }

  colors = ['#E52A00', '#E05500', '#DC6400', '#D88F00', '#D4B900', '#BECF00', '#90CB00', '#63C700', '#38C300', '#0EBF00']
  constructor() { }
  ngOnInit() {
    this.kalanZaman = this.teklifSuresi;
    setInterval(() => {
      this.kalanZaman > 0 ? this.kalanZaman-- : null;
    }, 1000)
  }
  teklifVer(teklif: number) {
    this.sonTeklif += teklif;
    this.kalanZaman = this.kalanZaman < this.uzatmaSuresi ? this.uzatmaSuresi : this.kalanZaman;
    this.teklifGeldi = true;
    setTimeout(() => {
      this.teklifGeldi = false;
    }, 1000);
  }
  sifirla() {
    this.sonTeklif = 0;
    this.teklifSuresi = this.teklifSuresi2;
    this.uzatmaSuresi = this.uzatmaSuresi2;
    this.kalanZaman = this.teklifSuresi;
  }
  getColor(number) {
    if (number > 10) {
      number = 10;
    }
    return this.colors[number - 1];
  }
}
