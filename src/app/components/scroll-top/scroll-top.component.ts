import { Component, OnInit, Inject, HostListener, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ScrollTopService } from './scroll-top.service';

@Component({
  selector: '[app-scroll-top]',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
          opacity: 0,
        }),
        style({
          transform: 'skewX(20deg)',
          opacity: 1,
        }),
        style({
          transform: 'skewX(-5deg)',
          opacity: 1,
        }),
        style({
          transform: 'none',
          opacity: 1,
        }),
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(100%, 0, 0) skewX(30deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
})
export class ScrollTopComponent extends Toast implements OnInit {

  windowScrolled: boolean;
  sonToastrId: number;
  constructor(
    protected toastrService: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }
  @HostListener('click')
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

  ngOnInit() { }
}
