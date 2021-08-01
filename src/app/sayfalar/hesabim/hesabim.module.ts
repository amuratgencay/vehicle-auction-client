import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HesabimRoutingModule } from './hesabim-routing.module';
import { RouterModule } from '@angular/router';
import { HesabimComponent } from './hesabim.component';
import { UyelikBilgilerimComponent } from './uyelik-bilgilerim/uyelik-bilgilerim.component';
import { KatildigimIhalelerComponent } from './katildigim-ihaleler/katildigim-ihaleler.component';
import { KazandigimIhalelerComponent } from './kazandigim-ihaleler/kazandigim-ihaleler.component';
import { HemenAldiklarimComponent } from './hemen-aldiklarim/hemen-aldiklarim.component';
import { FavoriIlanlarimComponent } from './favori-ilanlarim/favori-ilanlarim.component';
import { ElitUyelikGecisComponent } from './elit-uyelik-gecis/elit-uyelik-gecis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BakiyeYukleComponent } from './bakiye-yukle/bakiye-yukle.component';
import { ComponentsModule } from '../../components/components.module';
import { AracKarsilastirmaInfoComponent } from './arac-karsilastirma-info/arac-karsilastirma-info.component';
import { AracKarsilastirComponent } from './arac-karsilastir/arac-karsilastir.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../../pipes/pipes.module';
import { SayfalarModule } from '../sayfalar.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SifreDegistirComponent } from './sifre-degistir/sifre-degistir.component';


@NgModule({
  declarations: [
    HesabimComponent,
    UyelikBilgilerimComponent,
    KatildigimIhalelerComponent,
    KazandigimIhalelerComponent,
    HemenAldiklarimComponent,
    FavoriIlanlarimComponent,
    ElitUyelikGecisComponent,
    BakiyeYukleComponent,
    AracKarsilastirmaInfoComponent,
    AracKarsilastirComponent,
    SifreDegistirComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModalModule,
    HesabimRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule,
    AngularSvgIconModule.forRoot(),
    SayfalarModule,
    DragDropModule
  ],
  entryComponents: [
    AracKarsilastirComponent,
    SifreDegistirComponent
  ],
  exports: [
    AracKarsilastirComponent
  ]
})
export class HesabimModule { }
