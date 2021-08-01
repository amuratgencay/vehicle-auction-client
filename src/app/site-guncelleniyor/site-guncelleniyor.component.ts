import { Component, OnInit } from '@angular/core';
import { SistemAyarlariService } from '@zyazilim/online-ihale-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-guncelleniyor',
  templateUrl: './site-guncelleniyor.component.html',
  styleUrls: ['./site-guncelleniyor.component.scss']
})
export class SiteGuncelleniyorComponent implements OnInit {

  constructor(private sistemAyarlariService: SistemAyarlariService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sistemAyarlariService.getSiteGuncelleniyor().subscribe(d => {
      if (d.deger !== 'true') {
        this.router.navigate([''])
      }
    });
  }

}
