import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IcerikYonetimiService, IcerikYonetimiDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-site-kullanim-klavuzu',
  templateUrl: './site-kullanim-klavuzu.component.html',
  styleUrls: ['./site-kullanim-klavuzu.component.scss']
})
export class SiteKullanimKlavuzuComponent implements OnInit {
  icerik: IcerikYonetimiDTO;
  tumIcerik: IcerikYonetimiDTO[];

  constructor(private activatedRoute: ActivatedRoute, private icerikService: IcerikYonetimiService) {
  }

  ngOnInit() {
  }

}
