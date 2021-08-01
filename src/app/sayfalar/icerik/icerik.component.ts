import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IcerikYonetimiDTO, IcerikYonetimiService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-icerik',
  templateUrl: './icerik.component.html',
  styleUrls: ['./icerik.component.scss']
})
export class IcerikComponent implements OnInit {
  icerikler: IcerikYonetimiDTO[];
  kategoriKod = ''
  icerik: IcerikYonetimiDTO;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private icerikService: IcerikYonetimiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      if (this.kategoriKod !== p.kategoriKod) {
        this.kategoriKod = p.kategoriKod;
        this.icerikService.getByKategoriKod(p.kategoriKod)
          .subscribe(d => {
            this.icerikler = d;
            if (this.icerikler.length > 1 && (!p.altIcerikKod)) {
              let i = this.icerikler[0];
              this.router.navigate(['/icerik', i.kategori.kod, i.kod]);
            }
            if (p.altIcerikKod) {
              this.icerik = this.getIcerik(p.altIcerikKod);
            }
          });
      } else {
        if (this.icerikler.length > 1 && (!p.altIcerikKod)) {
          let i = this.icerikler[0];
          this.router.navigate(['/icerik', i.kategori.kod, i.kod]);
        } else {
          this.icerik = this.getIcerik(p.altIcerikKod);
        }
      }
    });
  }
  getIcerik(icerikKod): IcerikYonetimiDTO {
    return this.icerikler.find(p => p.kod === icerikKod);
  }
}
