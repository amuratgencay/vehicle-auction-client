import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcerikYonetimiDTO, IcerikYonetimiService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-hakkimizda-icerik',
  templateUrl: './hakkimizda-icerik.component.html',
  styleUrls: ['./hakkimizda-icerik.component.scss']
})
export class HakkimizdaIcerikComponent implements OnInit {
  icerik: IcerikYonetimiDTO;
  tumIcerik: IcerikYonetimiDTO[];

  constructor(private activatedRoute: ActivatedRoute, private icerikService: IcerikYonetimiService) {
    this.activatedRoute.params.subscribe(p => {
      let kod = p['kod'];
      // this.icerikService.getByKod(kod)
      //   .subscribe(d => {
      //     this.icerik = d;
      //   });
    });
  }

  ngOnInit() {
  }

}
