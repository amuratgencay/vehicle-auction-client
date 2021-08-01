import { Component, OnInit, Input, OnDestroy, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IhaleTeklifGeriSayim, IhaleTeklifService, IhaleTeklifServiceExtended } from '@zyazilim/online-ihale-data';
import { LocalStorageService } from '../../../../utils/local-storage.service';

@Component({
  selector: 'app-ihale-teklif-ses',
  templateUrl: './ihale-teklif-ses.component.html',
  styleUrls: ['./ihale-teklif-ses.component.scss']
})
export class IhaleTeklifSesComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @ViewChild('teklifSesRef', { static: true }) teklifSesRef: ElementRef;
  @ViewChild('sayacSesRef', { static: true }) sayacSesRef: ElementRef;
  @ViewChild('baslangicSesRef', { static: true }) baslangicSesRef: ElementRef;
  @ViewChild('enYuksekTeklifSesRef', { static: true }) enYuksekTeklifSesRef: ElementRef;

  @Input() ihaleAracId: string;
  public get sayacSes(): HTMLAudioElement {
    return this.sayacSesRef.nativeElement as HTMLAudioElement;
  }
  public get baslangicSes(): HTMLAudioElement {
    return this.baslangicSesRef.nativeElement as HTMLAudioElement;
  }
  public get enYuksekTeklifSes(): HTMLAudioElement {
    return this.enYuksekTeklifSesRef.nativeElement as HTMLAudioElement;
  }
  public get teklifSes(): HTMLAudioElement {
    return this.teklifSesRef.nativeElement as HTMLAudioElement;
  }
  @Input() teklifVarMi: boolean;
  // teklifSes: HTMLAudioElement;
  // sayacSes: HTMLAudioElement;
  teklifGeriSayim: IhaleTeklifGeriSayim;
  @Input() teklifSuresi: number;
  ihaleTeklifGeriSayim$: Subscription;
  public get sessiz(): boolean {
    return this.localStorageService.getItem('sessiz');
  }
  baslangicSesiCalindi: boolean;
  constructor(private ihaleTeklifService: IhaleTeklifServiceExtended,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.sesleriOlustur();
    this.geriSayim();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sayacSes.pause();
  }
  geriSayim() {
    this.ihaleTeklifGeriSayim$ = this.ihaleTeklifService.ihaleTeklifGeriSayim().subscribe(data => {
      if (!this.sessiz && this.ihaleAracId === data.i) {
        this.teklifGeriSayim = data;
        if (this.teklifGeriSayim.k >= this.teklifSuresi - 1) {
          if (!this.baslangicSesiCalindi && this.baslangicSes) {
            this.baslangicSes.play().then();
            this.baslangicSesiCalindi = true;
          }
        }
        if (!this.teklifVarMi && this.teklifGeriSayim.k <= 10 && this.sayacSes && this.sayacSes.paused) {
          this.sayacSes.currentTime = 12 + (10 - this.teklifGeriSayim.k);
          this.sayacSes.play().then();
        }
        if (this.teklifGeriSayim.k <= 5 && this.sayacSes && this.sayacSes.paused) {
          this.sayacSes.currentTime = 17 + (5 - this.teklifGeriSayim.k);
          this.sayacSes.play().then();
        }
      } else {
      }
    });
  }
  sessizeAl() {
    this.localStorageService.setItem('sessiz', !this.sessiz);
    this.sayacSes.volume = this.sessiz ? 0 : 1;
    this.baslangicSes.volume = this.sessiz ? 0 : 1;
    this.teklifSes.volume = this.sessiz ? 0 : 1;
  }
  sesleriOlustur() {
    this.teklifSes.volume = this.sessiz ? 0 : 1;
    this.teklifSes.pause();
    this.sayacSes.volume = this.sessiz ? 0 : 1;
    this.sayacSes.pause();
    this.baslangicSes.volume = this.sessiz ? 0 : 1;
    this.baslangicSes.pause();
  }
  teklifSesiCal(enYuksekTeklifMi) {
    this.sayacSes.pause();
    this.enYuksekTeklifSes.pause();
    if (enYuksekTeklifMi) {
      this.enYuksekTeklifSes.currentTime = 1;
      this.enYuksekTeklifSes.play();
    } else {
      this.teklifSes.currentTime = 0;
      this.teklifSes.play();
    }

  }
  ngOnDestroy(): void {
    this.ihaleTeklifGeriSayim$ && this.ihaleTeklifGeriSayim$.unsubscribe();
    this.destroySounds();
  }
  destroySounds() {
    this.sayacSes && this.sayacSes.pause();
    this.baslangicSes && this.baslangicSes.pause();
    this.teklifSes && this.teklifSes.pause();
    // this.teklifSes && this.teklifSes.nativeElement.removeAttribute('src');
    // this.teklifSes && this.teklifSes.nativeElement.load();
  }
}
