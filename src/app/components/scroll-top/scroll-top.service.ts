import { Injectable, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { ScrollTopComponent } from './scroll-top.component';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {
  windowScrolled: boolean;
  sonToastrId: number;
  options: GlobalConfig;

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    protected toastrService: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

  }
  init() {
    this.scrollDispatcher.scrolled().subscribe(this.onWindowScroll.bind(this));
    this.options = this.toastrService.toastrConfig;
  }
  // TODO: window isPlatform kontrol edilerek yapılacak.
  onWindowScroll(e) {
    if (isPlatformBrowser(this.platformId)) {

      if (window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop > 200) {
        this.windowScrolled = true;
        if (!this.sonToastrId) {
          this.show();
        }
      } else if (this.windowScrolled && window.pageYOffset
        || this.document.documentElement.scrollTop
        || this.document.body.scrollTop < 10) {
        this.windowScrolled = false;
        this.toastrService.clear(this.sonToastrId);
        this.sonToastrId = null;
      }
    }
  }
  show() {
    const opt = { ...this.options };
    opt.disableTimeOut = true;
    opt.tapToDismiss = false;
    opt.toastComponent = ScrollTopComponent;
    const inserted = this.toastrService.show('', '', opt);
    // let instance = inserted.toastRef.componentInstance as FavoriIlanYaklasiyorNotificationComponent;
    this.sonToastrId = inserted.toastId;
  }
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      (function smoothscroll() {
        const currentScroll = this.document.documentElement.scrollTop || this.document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll.bind(this));
          window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
      }.bind(this))();
    }
  }
}
