import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FavoriIlanListeDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: '[app-favori-ilan-yaklasiyor-notification]',
  templateUrl: './favori-ilan-yaklasiyor-notification.component.html',
  styleUrls: ['./favori-ilan-yaklasiyor-notification.component.scss'],
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
export class FavoriIlanYaklasiyorNotificationComponent extends Toast implements OnInit, AfterViewInit {

  @Input() guncelSira: number;
  @Input() araclar: FavoriIlanListeDTO[]
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
  }
  ngAfterViewInit(): void {
  }
}
