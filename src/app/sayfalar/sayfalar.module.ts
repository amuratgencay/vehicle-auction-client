import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SayfalarComponent } from './sayfalar.component';
import { SayfalarRoutingModule } from './sayfalar-routing.module';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule, NgbAlertModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { UyeKayitComponent } from './uye-kayit/uye-kayit.component';
import { IhaleAracDetayComponent } from './ihale-arac-detay/ihale-arac-detay.component';
import { RouterModule } from '@angular/router';
import { AracEkspertizGecmisiComponent } from './ihale-arac-detay/arac-ekspertiz-gecmisi/arac-ekspertiz-gecmisi.component';
import { AracMevcutDurumComponent } from './ihale-arac-detay/arac-mevcut-durum/arac-mevcut-durum.component';
import { AracDetaylariComponent } from './ihale-arac-detay/arac-detaylari/arac-detaylari.component';
import { IhaleBenzerAraclarComponent } from './ihale-arac-detay/ihale-benzer-araclar/ihale-benzer-araclar.component';
import { AraclarComponent } from './araclar/araclar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../pipes/pipes.module';
import { IhaleTeklifComponent } from './ihale-arac-detay/ihale-teklif/ihale-teklif.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AracDonanimlariComponent } from './ihale-arac-detay/arac-donanimlari/arac-donanimlari.component';
import { GeriSayimTestComponent } from './geri-sayim-test/geri-sayim-test.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SliderIcerikComponent } from './slider-icerik/slider-icerik.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AraclarHemenAlComponent } from './araclar-hemen-al/araclar-hemen-al.component';
import { IhaleTeklifSayacComponent } from './ihale-arac-detay/ihale-teklif/ihale-teklif-sayac/ihale-teklif-sayac.component';
import { IhaleTeklifButonlarComponent } from './ihale-arac-detay/ihale-teklif/ihale-teklif-butonlar/ihale-teklif-butonlar.component';
import { IhaleTeklifSesComponent } from './ihale-arac-detay/ihale-teklif/ihale-teklif-ses/ihale-teklif-ses.component';
import { IhaleAracHemenAlComponent } from './ihale-arac-detay/ihale-arac-hemen-al/ihale-arac-hemen-al.component';
import { IletisimComponent } from './iletisim/iletisim.component';
import { CountDownTimerModule } from '@zyazilim/count-down-timer';
import { AktivasyonComponent } from './aktivasyon/aktivasyon.component';
import { SifreSifirlaComponent } from './sifre-sifirla/sifre-sifirla.component';
import { AuthManagementService } from '../utils/auth-management.service';
import { SifreTalepComponent } from './sifre-talep/sifre-talep.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    SayfalarComponent,
    LoginComponent,
    AnaSayfaComponent,
    UyeKayitComponent,
    IhaleAracDetayComponent,
    AracEkspertizGecmisiComponent,
    AracMevcutDurumComponent,
    AracDetaylariComponent,
    IhaleBenzerAraclarComponent,
    AraclarComponent,
    IhaleTeklifComponent,
    AracDonanimlariComponent,
    GeriSayimTestComponent,
    SliderIcerikComponent,
    AraclarHemenAlComponent,
    IhaleTeklifSayacComponent,
    IhaleTeklifButonlarComponent,
    IhaleTeklifSesComponent,
    IhaleAracHemenAlComponent,
    IletisimComponent,
    AktivasyonComponent,
    SifreSifirlaComponent,
    SifreTalepComponent
  ],
  exports: [AracEkspertizGecmisiComponent],
  imports: [
    CommonModule,
    SayfalarRoutingModule,
    ComponentsModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    NgbTabsetModule,
    RouterModule,
    NgxPaginationModule,
    PipesModule,
    NgxGalleryModule,
    AngularSvgIconModule.forRoot(),
    CountDownTimerModule,
    ArchwizardModule,
    NgxMaskModule.forRoot(options)
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [AuthManagementService]
})
export class SayfalarModule { }
