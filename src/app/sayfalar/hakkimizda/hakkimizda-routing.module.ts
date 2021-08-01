import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteKullanimKlavuzuComponent } from './site-kullanim-klavuzu/site-kullanim-klavuzu.component';
import { HakkimizdaComponent } from './hakkimizda.component';
import { HakkimizdaIcerikComponent } from './hakkimizda-icerik/hakkimizda-icerik.component';


const routes: Routes = [
  {
    path: '',
    component: HakkimizdaComponent,
    children: [{
      path: 'site-kullanim-klavuzu/:kod',
      component: SiteKullanimKlavuzuComponent
    },
    {
      path: ':kod',
      component: HakkimizdaIcerikComponent
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HakkimizdaRoutingModule { }
