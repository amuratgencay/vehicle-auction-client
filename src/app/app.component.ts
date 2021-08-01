import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { Subscription } from 'rxjs';
import { GlobalConfig } from 'ngx-toastr';
import { AktifIhaleAracNotificationService } from './components/aktif-ihale-arac-notification/aktif-ihale-arac-notification.service';
import { FavoriIlanYaklasiyorNotificationService } from './components/favori-ilan-yaklasiyor-notification/favori-ilan-yaklasiyor-notification.service';
import { ScrollTopService } from './components/scroll-top/scroll-top.service';
import { IhaleTeklifVerilenAracDTO, SistemAyarlariServiceExtended } from '@zyazilim/online-ihale-data';
import { LocalStorageService } from './utils/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit, AfterViewInit {
  title = 'vehicle-auction-client';
  siteGuncelleniyor: boolean = false;
  subscriptions: Subscription[] = [];
  options: GlobalConfig;
  aktifArac: IhaleTeklifVerilenAracDTO;

  public get cerezlerOnaylandiMi(): boolean {
    return Boolean(this.localStorageService.getItem('cerezlerOnaylandiMi'));
  }

  constructor(private router: Router,
    private sistemAyarlariService: SistemAyarlariServiceExtended,
    private localStorageService: LocalStorageService,
    private scrollTopService: ScrollTopService,
    private modal: NgbModal,
    private aktifIhaleAracNotificationService: AktifIhaleAracNotificationService,
    favoriIlanYaklasiyorNotificationService: FavoriIlanYaklasiyorNotificationService) {
    aktifIhaleAracNotificationService.init();
    favoriIlanYaklasiyorNotificationService.init();
    scrollTopService.init();
    setTheme('bs4');
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.subscriptions.push(this.sistemAyarlariService.getSiteGuncelleniyor()
      .subscribe(d => {
        this.siteGuncelleniyor = d.deger === 'true';
        if (this.siteGuncelleniyor) {
          this.router.navigate(['/site-guncelleniyor'])
        }
      }));

    this.subscriptions.push(this.sistemAyarlariService.siteGuncelleniyor().subscribe(d => {
      if (Boolean(d)) {
        this.router.navigate(['/site-guncelleniyor'])
      }
    }));
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.modal.dismissAll();
      }

      if (event instanceof NavigationEnd) {
        this.scrollTopService.scrollToTop();
      }

      if (event instanceof NavigationError) {
      }
    });
  }
  ngOnDestroy(): void {
    for (const element of this.subscriptions) {
      element.unsubscribe();
    }
    this.aktifIhaleAracNotificationService.destroy();
  }
  cerezleriOnayla() {
    this.localStorageService.setItem('cerezlerOnaylandiMi', 'true');
  }

}
