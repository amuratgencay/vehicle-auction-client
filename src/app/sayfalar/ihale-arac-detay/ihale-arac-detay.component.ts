import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Subscription } from 'rxjs';
import { trigger } from '@angular/animations';
import { fadeOut, fadeIn } from 'src/app/utils/animations/fade.animations';
import { AuthServiceExtended, IhaleAracService, IhaleService, IhaleTeklifService, IhaleBilgisiListeDTO, IhaleTeklifServiceExtended, IhaleAracListeDTO, TokenDTO } from '@zyazilim/online-ihale-data';
@Component({
  selector: 'app-ihale-arac-detay',
  templateUrl: './ihale-arac-detay.component.html',
  styleUrls: ['./ihale-arac-detay.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ]
})
export class IhaleAracDetayComponent implements OnInit, OnDestroy {
  public get hemenAlaraciMi(): boolean {
    return this.sayfadakiArac && this.sayfadakiArac.ihaleBilgisiIhaleTipi === 2;
  }
  takipSayi: number;
  sayiDegisti$: Subscription;
  aracDurumId: number;
  public get eskiArac(): boolean {
    let buYil = new Date().getFullYear();
    if (new Date().getMonth() <= 6) {
      buYil--;
    }
    return this.sayfadakiArac && this.sayfadakiArac.aracYili < buYil;
  }
  ihaleAracId: any;
  ihaleId: any;
  tab: any = 'ekspertiz-raporu';
  ihale: IhaleBilgisiListeDTO;
  sayfadakiArac: IhaleAracListeDTO;
  galleryOptions: NgxGalleryOptions[];
  benzerAracTipi: string;
  aracDegisti$: Subscription;
  activatedRoute$: Subscription;
  veriGeldi: boolean;
  public get user(): TokenDTO {
    return this.authService.getToken();
  }

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthServiceExtended,
    private ihaleAracService: IhaleAracService,
    private ihaleService: IhaleService,
    private ihaleTeklifService: IhaleTeklifServiceExtended,
    public _cd: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit() {
    this.veriGeldi = false;
    this.sayiDegisti$ = this.ihaleTeklifService.sayiDegisti().subscribe((d) => {
      let ia = d.find(f => f.key === this.ihaleAracId);
      this.takipSayi = ia && ia.sayi;
    });
    this.aracDegisti$ = this.ihaleService.aracDegisti().subscribe(d => {
      if (this.sayfadakiArac.ihaleSirasi + 1 === d.ihaleSirasi) {
        this.router.navigate(['/ihale', d.ihaleBilgisiId, 'arac-detay', d.id, d.aracSeoUrl]);
      }
    });
    this.galleryOptions = [
      {
        width: '100%',

        // ToDo: Burası standart şekilde gelen galeride çalışan boyut.
        // ToDo: 375px olarak güncellememiz gereken ayar burada abi. Araç görseli hazırlanıyorda ihale başlamamışsa 375, başladıysa 500 olarak kalmalı.
        // ToDo: Aynı zamanda eğer aracın kendi fotoğrafı ve galerisi varsa o da 500 olarak kalacak.

        height: '500px',
        thumbnailsPercent: 20,
        thumbnailsMargin: 5,
        thumbnailMargin: 5,
        thumbnailsColumns: 5,
        previewCloseOnEsc: true,
        previewCloseOnClick: true,
        previewInfinityMove: true,
        preview: true,
        imageInfinityMove: true,
        imageSwipe: true,
        imageArrows: true,
        thumbnailsArrows: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        arrowNextIcon: 'fa fa-arrow-right',
        arrowPrevIcon: 'fa fa-arrow-left',
        thumbnailsAutoHide: true,
        imagePercent: 80,
        lazyLoading: true
      },
      {
        breakpoint: 1190,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        thumbnailsColumns: 5,
      },
      {
        breakpoint: 991,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        thumbnailsColumns: 5,
      },
      {
        breakpoint: 600,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        thumbnailsColumns: 4,
      }
    ];
    this.activatedRoute$ = this.activatedRoute.params.subscribe(params => {
      if (this.ihaleAracId) {
        this.ihaleTeklifService.ihaleAractanAyril(this.ihaleAracId).subscribe();
      }
      this.ihaleId = params.ihaleId;
      this.ihaleService.get(params.ihaleId).subscribe(ihale => {
        this.ihale = ihale;
      });
      this.ihaleTeklifService.ihaleAracaKatil(params.ihaleAracId).subscribe(d => {
      });
      this.ihaleAracService.get(params.ihaleAracId).subscribe(arac => {
        this.veriGeldi = true;
        this.sayfadakiArac = arac;
        this.ihaleAracId = params.ihaleAracId;
        this.ihaleTeklifService.sayfadakiAracId = params.ihaleAracId;
        if (!this.sayfadakiArac.aracResimleri.length) {
          this.galleryOptions[0].height = '375px';
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.ihaleTeklifService.ihaleAractanAyril(this.ihaleAracId).subscribe();
    if (this.aracDegisti$) {
      this.aracDegisti$.unsubscribe();
      this.activatedRoute$.unsubscribe();
      this.sayiDegisti$ && this.sayiDegisti$.unsubscribe();

    }
  }
  benzerAraclaraGit(e) {
    this.tab = 'benzer-araclar';
    this.benzerAracTipi = e;
  }
}
