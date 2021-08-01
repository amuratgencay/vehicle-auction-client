import { Component, OnInit } from '@angular/core';
import { MarkaDTO, IcerikYonetimiDTO, IcerikKategorisi, MarkaService, IcerikYonetimiService, IcerikKategorisiService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  markalar: MarkaDTO[];
  icerikler: IcerikYonetimiDTO[];
  adres: IcerikYonetimiDTO;
  telefon: IcerikYonetimiDTO;
  eposta: IcerikYonetimiDTO;
  youtube: IcerikYonetimiDTO;
  linkedin: IcerikYonetimiDTO;
  facebook: IcerikYonetimiDTO;
  twitter: IcerikYonetimiDTO;
  instagram: IcerikYonetimiDTO;
  menuler: IcerikKategorisi[];

  constructor(private markaService: MarkaService,
    private icerikService: IcerikYonetimiService,
    private icerikKategorisiService: IcerikKategorisiService) { }

  ngOnInit() {
    this.markaService.getAll()
      .subscribe(d => {
        this.markalar = d;
      });
    this.icerikKategorisiService.getAll()
      .subscribe(res => {
        this.menuler = res.filter(p => p.menudeGoster && !p.ustKategoriId);

      })
    this.icerikService.getByKategoriKod('sosyal-medya')
      .subscribe(d => {
        this.youtube = d.find(f => f.kod === 'youtube');
        this.linkedin = d.find(f => f.kod === 'linkedin');
        this.facebook = d.find(f => f.kod === 'facebook');
        this.twitter = d.find(f => f.kod === 'twitter');
        this.instagram = d.find(f => f.kod === 'instagram');
      });
    this.icerikService.getByKategoriKod('iletisim')
      .subscribe(d => {
        this.adres = d.find(f => f.kod === 'adres');
        this.telefon = d.find(f => f.kod === 'telefon');
        this.eposta = d.find(f => f.kod === 'eposta');
      });
  }

}
