import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../sayfalar/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { BakiyeYukleComponent } from '../bakiye-yukle/bakiye-yukle.component';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  IcerikYonetimiService,
  IcerikYonetimiDTO, UyeBilgiDTO,
  IhaleBilgisiListeDTO, IhaleAracListeDTO, IcerikKategorisi,
  TokenDTO, IhaleService, IhaleAracService, IcerikKategorisiService, AuthServiceExtended, AracAraDTO, UyeBilgiServiceExtended
} from '@zyazilim/online-ihale-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchChange: Subject<string> = new Subject<string>();
  hover: string;
  searchText: string;
  isNavbarCollapsed = true;
  youtube: IcerikYonetimiDTO;
  linkedin: IcerikYonetimiDTO;
  facebook: IcerikYonetimiDTO;
  twitter: IcerikYonetimiDTO;
  instagram: IcerikYonetimiDTO;
  uyeBilgi: UyeBilgiDTO;
  isSearchCollapsed: boolean = true;
  searchChangeSub$: Subscription;
  ihale: IhaleBilgisiListeDTO;
  aramaSonucu: IhaleAracListeDTO[];
  menuler: IcerikKategorisi[];
  public get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }
  public get user(): TokenDTO {
    return this.authService.getToken();
  }
  faUserAlt = faUserAlt;
  constructor(private modalService: NgbModal,
    private authService: AuthServiceExtended,
    private ihaleService: IhaleService,
    private ihaleAracService: IhaleAracService,
    private icerikService: IcerikYonetimiService,
    private icerikKategorisiService: IcerikKategorisiService,
    private uyeBilgiService: UyeBilgiServiceExtended) {
    this.ihaleService.getEnYakinVeyaAktifIhale()
      .subscribe(s => {
        this.ihale = s;
        if (s) {
          this.ihaleAracService.arama(new AracAraDTO({ ihaleBilgisiId: s.id }))
            .subscribe(res => {
              this.aramaSonucu = res.sort((a, b) => { return b.ihaleSirasi - a.ihaleSirasi });
            });
        }
      });
  }

  ngOnInit() {
    this.searchChangeSub$ = this.searchChange
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.ihale) {

        }
      });
    if (this.user) {
      this.uyeBilgiService.getFavoriIlanlar(this.user.userId)
        .subscribe(d => {
          this.uyeBilgiService.favoriIlanlar = d;
        });
      this.uyeBilgiService.uyeBilgiDegisti(this.user.userId)
        .subscribe(() => {
          this.uyeBilgiGetir();
        });
      this.uyeBilgiGetir();
    }
    this.authService.onAuthenticationChange()
      .subscribe(res => {
        if (res) {
          this.uyeBilgiService.getFavoriIlanlar(this.user.userId)
            .subscribe(d => {
              this.uyeBilgiService.favoriIlanlar = d;
            });
          this.uyeBilgiGetir();
        }
      });
    this.icerikKategorisiService.getAll()
      .subscribe(res => {
        this.menuler = res.filter(p => p.menudeGoster && !p.ustKategoriId);
        this.icerikService.getByKategori(res.find(p => p.kod === 'sosyal-medya').id)
          .subscribe(d => {
            this.youtube = d.find(f => f.kod === 'youtube');
            this.linkedin = d.find(f => f.kod === 'linkedin');
            this.facebook = d.find(f => f.kod === 'facebook');
            this.twitter = d.find(f => f.kod === 'twitter');
            this.instagram = d.find(f => f.kod === 'instagram');
          });
      });
    // this.icerikService.getByKategori(3)
    //   .subscribe(d => {
    //     this.youtube = d.find(f => f.kod === 'youtube');
    //     this.linkedin = d.find(f => f.kod === 'linkedin');
    //     this.facebook = d.find(f => f.kod === 'facebook');
    //     this.twitter = d.find(f => f.kod === 'twitter');
    //     this.instagram = d.find(f => f.kod === 'instagram');
    //   });
  }
  login() {
    let modal = this.modalService.open(LoginComponent, { centered: true, })
    modal.result.then(() => {
    }, () => {
    });
  }
  cikis() {
    this.authService.logout().subscribe(() => {

    });
  }
  bakiyeYukle() {
    let modal = this.modalService.open(BakiyeYukleComponent, { centered: true });
    modal.result.then(() => {
    }, () => {
    });
  }

  private uyeBilgiGetir() {
    this.uyeBilgiService.get(this.user.userId)
      .subscribe(d => {
        this.uyeBilgi = d;
      });
  }

  ngOnDestroy(): void {
    if (this.searchChangeSub$) {
      this.searchChangeSub$.unsubscribe();
    }
  }
}
