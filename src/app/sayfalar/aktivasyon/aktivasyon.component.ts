import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AktivasyonSonucuDTO, UyeBilgiService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-aktivasyon',
  templateUrl: './aktivasyon.component.html',
  styleUrls: ['./aktivasyon.component.scss']
})
export class AktivasyonComponent implements OnInit {
  sonuc: AktivasyonSonucuDTO;
  code: string;
  constructor(private uyeBilgiService: UyeBilgiService,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.code = this.router.snapshot.params.code;
    if (this.code) {
      this.uyeBilgiService.aktivasyon(this.code)
        .subscribe(d => {
          this.sonuc = d;
        })
    } else {
      this.route.navigate(['/'])
    }

  }

}
