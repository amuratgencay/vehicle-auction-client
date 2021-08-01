import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AracService, AracDonanimDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-arac-donanimlari',
  templateUrl: './arac-donanimlari.component.html',
  styleUrls: ['./arac-donanimlari.component.scss']
})
export class AracDonanimlariComponent implements OnInit, OnChanges {
  @Input() aracId: string;
  donanimlar: AracDonanimDTO[];
  constructor(private aracDonanimService: AracService) { }

  ngOnInit() {
  }
  private getData() {
    this.aracDonanimService.getDonanimlari(this.aracId)
      .subscribe(data => {
        this.donanimlar = data;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }
}
