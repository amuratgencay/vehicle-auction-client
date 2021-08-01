import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { GeriSayimComponent } from './geri-sayim/geri-sayim.component';
import { AnaSayfaCarouselComponent } from './ana-sayfa-carousel/ana-sayfa-carousel.component';
import { SolAramaMenuComponent } from './sol-arama-menu/sol-arama-menu.component';
import { NgbCarouselModule, NgbDropdownModule, NgbCollapseModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FirsatAraciCardComponent } from './firsat-araci-card/firsat-araci-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AracListesiFiltreComponent } from './arac-listesi-filtre/arac-listesi-filtre.component';
import { OneCikanAraclarComponent } from './one-cikan-araclar/one-cikan-araclar.component';
import { AltBannerComponent } from './alt-banner/alt-banner.component';
import { BultenKayitComponent } from './bulten-kayit/bulten-kayit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriEkleComponent } from './favori-ekle/favori-ekle.component';
import { AraclarListeComponent } from './araclar-liste/araclar-liste.component';
import { AraclarCardComponent } from './araclar-card/araclar-card.component';
import { BilgiModalComponent } from './bilgi-modal/bilgi-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SiradakiAraclarComponent } from './siradaki-araclar/siradaki-araclar.component';
import { BakiyeYukleComponent } from './bakiye-yukle/bakiye-yukle.component';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AracCardComponent } from './arac-card/arac-card.component';
import { TableComponent } from './table/table.component';
import { PipesModule } from '../pipes/pipes.module';
import { IhaleSayfalamaBilgisiComponent } from './ihale-sayfalama-bilgisi/ihale-sayfalama-bilgisi.component';
import { IhaleBittiModalComponent } from './ihale-bitti-modal/ihale-bitti-modal.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AktifIhaleAracNotificationComponent } from './aktif-ihale-arac-notification/aktif-ihale-arac-notification.component';
import { FavoriIlanYaklasiyorNotificationComponent } from './favori-ilan-yaklasiyor-notification/favori-ilan-yaklasiyor-notification.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { OdemeModalComponent } from './odeme-modal/odeme-modal.component';
@NgModule({
  declarations: [
    TopBarComponent,
    HeaderComponent,
    FooterComponent,
    BottomBarComponent,
    GeriSayimComponent,
    AnaSayfaCarouselComponent,
    SolAramaMenuComponent,
    FirsatAraciCardComponent,
    AracListesiFiltreComponent,
    OneCikanAraclarComponent,
    AltBannerComponent,
    BultenKayitComponent,
    FavoriEkleComponent,
    AraclarListeComponent,
    AraclarCardComponent,
    BilgiModalComponent,
    SiradakiAraclarComponent,
    BakiyeYukleComponent,
    AracCardComponent,
    TableComponent,
    IhaleSayfalamaBilgisiComponent,
    IhaleBittiModalComponent,
    AktifIhaleAracNotificationComponent,
    FavoriIlanYaklasiyorNotificationComponent,
    ScrollTopComponent,
    OdemeModalComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule,
    CollapseModule,
    FontAwesomeModule,
    FormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    PipesModule,
    AngularSvgIconModule.forRoot(),
    NgbModalModule,
    NgbTooltipModule,
  ],
  exports: [
    TopBarComponent,
    HeaderComponent,
    FooterComponent,
    BottomBarComponent,
    GeriSayimComponent,
    AnaSayfaCarouselComponent,
    SolAramaMenuComponent,
    FirsatAraciCardComponent,
    AracListesiFiltreComponent,
    OneCikanAraclarComponent,
    AltBannerComponent,
    BultenKayitComponent,
    AraclarListeComponent,
    AraclarCardComponent,
    SiradakiAraclarComponent,
    TableComponent,
    BakiyeYukleComponent,
    IhaleSayfalamaBilgisiComponent,
    AracCardComponent,
    FavoriEkleComponent,
    AktifIhaleAracNotificationComponent,
    FavoriIlanYaklasiyorNotificationComponent,
    ScrollTopComponent
  ],
  entryComponents: [
    BilgiModalComponent,
    BakiyeYukleComponent,
    IhaleBittiModalComponent,
    AktifIhaleAracNotificationComponent,
    FavoriIlanYaklasiyorNotificationComponent,
    ScrollTopComponent,
    OdemeModalComponent
  ],
  providers: []
})
export class ComponentsModule { }
