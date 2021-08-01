import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AracListeDTO, AracService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-arac-detaylari',
  templateUrl: './arac-detaylari.component.html',
  styleUrls: ['./arac-detaylari.component.scss']
})
export class AracDetaylariComponent implements OnInit, OnChanges {

  @Input() aracId: string;
  arac: AracListeDTO;
  constructor(private aracService: AracService) { }

  ngOnInit() {
  }
  private getData() {
    this.aracService.get(this.aracId)
      .subscribe(d => {
        this.arac = d;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
}
