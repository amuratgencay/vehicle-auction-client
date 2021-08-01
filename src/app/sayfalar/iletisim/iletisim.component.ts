import { Component, OnInit } from '@angular/core';
import { IcerikYonetimiDTO, IcerikYonetimiService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-iletisim',
  templateUrl: './iletisim.component.html',
  styleUrls: ['./iletisim.component.scss']
})
export class IletisimComponent implements OnInit {
  adres: IcerikYonetimiDTO;
  telefon: IcerikYonetimiDTO;
  eposta: IcerikYonetimiDTO;
  firmaAdi: IcerikYonetimiDTO;
  vergiNumarasi: IcerikYonetimiDTO;
  vergiDairesi: IcerikYonetimiDTO;
  kepAdresi: IcerikYonetimiDTO;
  constructor(
    private icerikService: IcerikYonetimiService) { }
  ngOnInit() {
    this.icerikService.getByKategoriKod('iletisim')
      .subscribe(d => {
        this.adres = d.find(f => f.kod === 'adres');
        this.telefon = d.find(f => f.kod === 'telefon');
        this.eposta = d.find(f => f.kod === 'eposta');
      });
    this.icerikService.getByKategoriKod('firma-bilgileri')
      .subscribe(d => {
        this.firmaAdi = d.find(f => f.kod === 'firma-adi');
        this.vergiNumarasi = d.find(f => f.kod === 'vergi-numarasi');
        this.vergiDairesi = d.find(f => f.kod === 'vergi-dairesi');
        this.kepAdresi = d.find(f => f.kod === 'kep-adresi');
      });
  }
}
