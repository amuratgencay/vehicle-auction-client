import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {
  EnumValue, ModelService,
  MarkaService, AracVersiyonService, EnumsService, MarkaDTO, IAracAraDTO, ModelDTO, AramaDataTransferService, AracVersionDTO
} from '@zyazilim/online-ihale-data';
import { Selectable } from './selectable.dto';

@Component({
  selector: 'app-sol-arama-menu',
  templateUrl: './sol-arama-menu.component.html',
  styleUrls: ['./sol-arama-menu.component.scss']
})
export class SolAramaMenuComponent implements OnInit {
  faAngleDown = faAngleDown;
  aracModelleri: Selectable<ModelDTO>[];
  aracVersiyonlari: Selectable<AracVersionDTO>[];
  filtreliVersiyonlar: Selectable<AracVersionDTO>[];
  versiyonKapali = true;
  markaModelKapali = true;
  fiyatKapali = true;
  kilometreKapali = true;
  yilKapali = true;
  vitesKapali = true;
  yakitKapali = true;
  motorGucuKapali = true;
  vitesTipleri: Selectable<EnumValue>[];
  yakitTipleri: Selectable<EnumValue>[];
  aracAraModel: IAracAraDTO = {};
  form: FormGroup;
  aracMarkalari: Selectable<MarkaDTO>[];
  constructor(private modelService: ModelService,
    private markaService: MarkaService,
    private aracVersiyonService: AracVersiyonService,
    private enumsService: EnumsService,
    private router: Router,
    private activated: ActivatedRoute,
    private aramaDataTransfer: AramaDataTransferService) {
  }

  ngOnInit() {
    this.aracAraModel = { ...this.activated.snapshot.queryParams };
    this.markaService.getAll()
      .subscribe(data => {
        this.aracMarkalari = data.map(a => {
          let x = new Selectable<MarkaDTO>();
          x.secili = this.aracAraModel.markalar && this.aracAraModel.markalar.indexOf(a.id) > -1;
          x.data = a
          return x;
        });
      });
    this.modelService.getAll()
      .subscribe(data => {
        this.aracModelleri = data.map(a => {
          let x = new Selectable<ModelDTO>();
          if (this.aracAraModel.markalar && this.aracAraModel.markalar.length) {
            x.secili = this.aracAraModel.markalar && this.aracAraModel.markalar.indexOf(a.markaId) > -1
          }
          if (!x.secili) {
            x.secili = this.aracAraModel.modeller && this.aracAraModel.modeller.indexOf(a.id) > -1
          }
          x.data = a
          return x;
        });
      });
    this.aracVersiyonService.getAll()
      .subscribe(data => {
        this.aracVersiyonlari = data.map(a => {
          let x = new Selectable<AracVersionDTO>();
          x.secili = this.aracAraModel.versiyonlar && this.aracAraModel.versiyonlar.indexOf(a.id) > -1;
          x.data = a;
          return x;
        });
      });
    this.enumsService.getVitesTipleri().subscribe(data => {
      this.vitesTipleri = data.map(a => {
        let x = new Selectable<EnumValue>();
        x.secili = this.aracAraModel.vitesTipleri && this.aracAraModel.vitesTipleri.indexOf(a.value) > -1;
        x.data = a
        return x;
      });
    });
    this.enumsService.getYakitTipleri().subscribe(data => {
      this.yakitTipleri = data.map(a => {
        let x = new Selectable<EnumValue>();
        x.secili = this.aracAraModel.yakitTipleri && this.aracAraModel.yakitTipleri.indexOf(a.value) > -1;
        x.data = a
        return x;
      });
    });
    this.activated.queryParams.subscribe(s => {
      this.aracAraModel = { ...s };
    });
  }
  versiyonAciliyor() {
    this.filtreliVersiyonlar = this.aracVersiyonlari ? this.aracVersiyonlari.filter(f => {
      return this.aracModelleri.filter(f => f.secili).map(m => m.data.id).indexOf(f.data.modelId) > -1;
    }) : this.aracVersiyonlari
  }
  aracModelDegisti(m: Selectable<ModelDTO>) {
    m.secili = !m.secili;
    this.aracMarkalari.filter(p => p.data.id === m.data.markaId).forEach(element => {
      element.secili = this.aracModelleri.filter(p => p.data.markaId === element.data.id && p.secili).length > 0;
    });
    this.versiyonAciliyor();
  }
  aracMarkaDegisti(m: Selectable<MarkaDTO>) {
    m.secili = !m.secili;
    this.aracModelleri.filter(p => p.data.markaId === m.data.id).forEach(element => {
      element.secili = m.secili;
    });
    this.versiyonAciliyor();
  }
  ara() {
    this.aracAraModel.markalar = [];
    this.aracAraModel.versiyonlar = this.aracVersiyonlari.filter(f => f.secili).map(m => m.data.id);
    this.aracAraModel.modeller = this.aracModelleri.filter(f => f.secili).map(m => m.data.id);
    this.aracAraModel.vitesTipleri = this.vitesTipleri.filter(f => f.secili).map(m => m.data.value);
    this.aracAraModel.yakitTipleri = this.yakitTipleri.filter(f => f.secili).map(m => m.data.value);
    this.aramaDataTransfer.aracFiltre = this.aracAraModel;
    if (this.activated.snapshot.url && this.activated.snapshot.url.length) {
      let a = this.activated.snapshot.url[0].path;
      if (a === 'araclar') {
        this.router.navigate(['araclar', this.activated.snapshot.url[1].path], { queryParams: this.aracAraModel });
        return;
      }
    }
    this.router.navigate(['/araclar', 'aktif'], { queryParams: this.aracAraModel });
    return;
  }
}
