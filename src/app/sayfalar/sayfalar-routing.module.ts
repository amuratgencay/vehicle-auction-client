import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SayfalarComponent } from './sayfalar.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { UyeKayitComponent } from './uye-kayit/uye-kayit.component';
import { IhaleAracDetayComponent } from './ihale-arac-detay/ihale-arac-detay.component';
import { AraclarComponent } from './araclar/araclar.component';
import { GeriSayimTestComponent } from './geri-sayim-test/geri-sayim-test.component';
import { SliderIcerikComponent } from './slider-icerik/slider-icerik.component';
import { AraclarHemenAlComponent } from './araclar-hemen-al/araclar-hemen-al.component';
import { IletisimComponent } from './iletisim/iletisim.component';
import { AktivasyonComponent } from './aktivasyon/aktivasyon.component';
import { SifreSifirlaComponent } from './sifre-sifirla/sifre-sifirla.component';
import { SifreTalepComponent } from './sifre-talep/sifre-talep.component';

const routes: Routes = [
  {
    path: '',
    component: SayfalarComponent,
    children: [
      {
        path: '',
        component: AnaSayfaComponent
      },
      {
        path: 'araclar/:tab',
        component: AraclarComponent
      },
      {
        path: 'hemen-al/araclar/:tab',
        component: AraclarHemenAlComponent
      },
      {
        path: 'slider-icerik/:id',
        component: SliderIcerikComponent
      },
      {
        path: 'ihale/:ihaleId/arac-detay/:ihaleAracId/:aracAdi',
        component: IhaleAracDetayComponent
      },
      {
        path: 'uye-kayit',
        component: UyeKayitComponent
      },
      {
        path: 'iletisim',
        component: IletisimComponent
      },
      {
        path: 'geri-sayim-test',
        component: GeriSayimTestComponent
      },
      {
        path: 'hakkimizda',
        loadChildren: () => import('./hakkimizda/hakkimizda.module').then(mod => mod.HakkimizdaModule)
      },
      {
        path: 'hesabim',
        loadChildren: () => import('./hesabim/hesabim.module').then(mod => mod.HesabimModule)
      },
      {
        path: 'icerik',
        loadChildren: () => import('./icerik/icerik.module').then(mod => mod.IcerikModule)
      },
      {
        path: 'aktivasyon/:code',
        component: AktivasyonComponent
      },
      {
        path: 'sifre-sifirla/:code',
        component: SifreSifirlaComponent
      },
      {
        path: 'sifre-talep',
        component: SifreTalepComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SayfalarRoutingModule { }