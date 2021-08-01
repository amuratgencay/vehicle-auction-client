import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HakkimizdaRoutingModule } from './hakkimizda-routing.module';
import { HakkimizdaComponent } from './hakkimizda.component';
import { SiteKullanimKlavuzuComponent } from './site-kullanim-klavuzu/site-kullanim-klavuzu.component';
import { HakkimizdaIcerikComponent } from './hakkimizda-icerik/hakkimizda-icerik.component';


@NgModule({
  declarations: [HakkimizdaComponent,
    SiteKullanimKlavuzuComponent,
    HakkimizdaIcerikComponent,
  ],
  imports: [
    CommonModule,
    HakkimizdaRoutingModule,
  ]
})
export class HakkimizdaModule { }
