import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { httpInterceptorProviders } from './interceptors';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from './pipes/pipes.module';
import { SiteGuncelleniyorComponent } from './site-guncelleniyor/site-guncelleniyor.component';
import { ToastrModule } from 'ngx-toastr';
import { ComponentsModule } from './components/components.module';
import localeTr from '@angular/common/locales/tr';
import { OnlineIhaleDataModule } from '@zyazilim/online-ihale-data'
import { environment } from '../environments/environment';
registerLocaleData(localeTr, 'tr');
@NgModule({
  declarations: [
    AppComponent,
    SiteGuncelleniyorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    PipesModule,
    ComponentsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    OnlineIhaleDataModule.forRoot({
      apiUrl: environment.apiUrl,
      signalrUrl: environment.signalrUrl,
      baseApiUrl: environment.baseApiUrl
    })
  ],
  providers: [httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'tr-TR' },
    { provide: APP_BASE_HREF, useValue: '/' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
