import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UyelikBilgilerimComponent } from './uyelik-bilgilerim/uyelik-bilgilerim.component';
import { KatildigimIhalelerComponent } from './katildigim-ihaleler/katildigim-ihaleler.component';
import { KazandigimIhalelerComponent } from './kazandigim-ihaleler/kazandigim-ihaleler.component';
import { HemenAldiklarimComponent } from './hemen-aldiklarim/hemen-aldiklarim.component';
import { FavoriIlanlarimComponent } from './favori-ilanlarim/favori-ilanlarim.component';
import { ElitUyelikGecisComponent } from './elit-uyelik-gecis/elit-uyelik-gecis.component';
import { HesabimComponent } from './hesabim.component';
import { BakiyeYukleComponent } from './bakiye-yukle/bakiye-yukle.component';
import { LoggedInGuard } from '../../security/guards/logged-in.guard';


const routes: Routes = [{
  path: '',
  component: HesabimComponent,
  canActivate: [LoggedInGuard],
  children: [
    {
      path: '',
      component: UyelikBilgilerimComponent
    },
    {
      path: 'uyelik-bilgilerim',
      component: UyelikBilgilerimComponent
    },
    {
      path: 'katildigim-ihaleler',
      component: KatildigimIhalelerComponent
    },
    {
      path: 'kazandigim-ihaleler',
      component: KazandigimIhalelerComponent
    },
    {
      path: 'hemen-aldiklarim',
      component: HemenAldiklarimComponent
    },
    {
      path: 'favori-ilanlarim',
      component: FavoriIlanlarimComponent
    },
    {
      path: 'elit-uyelik-gecis',
      component: ElitUyelikGecisComponent
    },
    {
      path: 'bakiye-yukle',
      component: BakiyeYukleComponent
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HesabimRoutingModule { }
