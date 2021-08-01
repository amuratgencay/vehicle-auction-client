import { Component, OnInit, Input } from '@angular/core';
import { IhaleAracListeDTO } from '@zyazilim/online-ihale-data';


@Component({
  selector: 'app-arac-card',
  templateUrl: './arac-card.component.html',
  styleUrls: ['./arac-card.component.scss']
})
export class AracCardComponent implements OnInit {
  @Input() arac: IhaleAracListeDTO;

  public get eskiArac(): boolean {
    let buYil = new Date().getFullYear();
    if (new Date().getMonth() <= 6) {
      buYil--;
    }
    return this.arac && this.arac.aracYili < buYil;
  }
  constructor() { }

  ngOnInit() {
  }
}
