import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteGuncelleniyorComponent } from './site-guncelleniyor/site-guncelleniyor.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sayfalar/sayfalar.module').then(mod => mod.SayfalarModule)
  },
  {
    path: 'site-guncelleniyor',
    component: SiteGuncelleniyorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
