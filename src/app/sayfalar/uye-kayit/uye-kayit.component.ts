import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../../components/bilgi-modal/bilgi-modal.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SehirDTO, IcerikYonetimiDTO, UyeBilgiService, SehirService, IcerikYonetimiService, AuthServiceExtended } from '@zyazilim/online-ihale-data';
import { MustMatch } from '../../utils/must-match-validator';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-uye-kayit',
  templateUrl: './uye-kayit.component.html',
  styleUrls: ['./uye-kayit.component.scss'],
})
export class UyeKayitComponent implements OnInit, OnDestroy {

  // private stepper: Stepper;
  sehirler: SehirDTO[];
  form: FormGroup = new FormGroup({});
  hataMesaji: string;
  authServiceSub$: Subscription;
  uyeKayitForm: FormGroup;
  onBilgilendirmeForm: FormGroup;
  aracSatisSozlemesiForm: FormGroup;
  onBilgilendirmeFormu: IcerikYonetimiDTO;
  aracSatisSozlesmesi: IcerikYonetimiDTO;
  constructor(private uyeBilgiService: UyeBilgiService,
    private formBuilder: FormBuilder,
    private sehirService: SehirService,
    private icerikService: IcerikYonetimiService,
    private authService: AuthServiceExtended,
    private router: Router,
    private modalService: NgbModal) {
    sehirService.getAll()
      .subscribe(data => this.sehirler = data);
    this.uyeKayitForm = this.formBuilder.group({
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl('90', [Validators.required], this.validatePhoneNotTaken.bind(this)),
      eposta: new FormControl('', [Validators.required, Validators.email], this.validateEmailNotTaken.bind(this)),
      epostaTekrar: new FormControl('', [Validators.required, Validators.email]),
      tcKimlikNo: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)], this.validateIdentityNotTaken.bind(this)),
      sifre: new FormControl('', [Validators.required]),
      sifreTekrar: new FormControl('', [Validators.required]),
      sehirId: new FormControl('', [Validators.required]),
      adres: new FormControl('', [Validators.required]),
      firmaAdi: new FormControl(''),
      vergiDairesi: new FormControl(''),
      vergiNumarasi: new FormControl(''),
      kampanyaIzin: new FormControl(false),
      kurumsalUye: new FormControl(false),
    }, { validators: [MustMatch('eposta', 'epostaTekrar'), MustMatch('sifre', 'sifreTekrar')] });
    this.uyeKayitForm.get('kurumsalUye').valueChanges.subscribe(val => {
      if (val) {
        this.uyeKayitForm.controls.vergiDairesi.setValidators([Validators.required]);
        this.uyeKayitForm.controls.vergiDairesi.updateValueAndValidity();
        this.uyeKayitForm.controls.vergiNumarasi.setValidators([Validators.required]);
        this.uyeKayitForm.controls.vergiNumarasi.updateValueAndValidity();
        this.uyeKayitForm.controls.firmaAdi.setValidators([Validators.required]);
        this.uyeKayitForm.controls.firmaAdi.updateValueAndValidity();
      } else {
        this.uyeKayitForm.controls.vergiDairesi.clearValidators();
        this.uyeKayitForm.controls.vergiDairesi.updateValueAndValidity();
        this.uyeKayitForm.controls.vergiNumarasi.clearValidators();
        this.uyeKayitForm.controls.vergiNumarasi.updateValueAndValidity();
        this.uyeKayitForm.controls.firmaAdi.clearValidators();
        this.uyeKayitForm.controls.firmaAdi.updateValueAndValidity();
      }
    });
    this.onBilgilendirmeForm = this.formBuilder.group({
      onBilgilendirme: new FormControl(false, [Validators.requiredTrue]),
    });
    this.aracSatisSozlemesiForm = this.formBuilder.group({
      aracSatisSozlemesi: new FormControl(false, [Validators.requiredTrue]),
    });
    this.form.addControl('uyeBilgiForm', this.uyeKayitForm);
    this.form.addControl('onBilgilendirmeForm', this.onBilgilendirmeForm);
    this.form.addControl('aracSatisSozlemesiForm', this.aracSatisSozlemesiForm);
    this.icerikService.getByKategoriKod('sozlesmeler').subscribe(d => {
      this.aracSatisSozlesmesi = d.find(p => p.kod === 'arac-satis-sozlesmesi');
      this.onBilgilendirmeFormu = d.find(p => p.kod === 'on-bilgilendirme-formu');
    })
  }
  get uyeBilgiFormControls() { return (this.uyeKayitForm).controls; }
  get onBilgilendirmeFormControls() { return (this.onBilgilendirmeForm).controls; }
  get aracSatisSozlemesiFormControls() { return (this.aracSatisSozlemesiForm).controls; }
  ngOnInit() {
    // this.stepper = new Stepper(document.querySelector('#stepper1'), {
    //   linear: false,
    //   animation: true
    // });
    this.authServiceSub$ = this.authService.onAuthenticationChange().subscribe(s => {
      if (s) {
        this.router.navigate(['']);
      }
    });
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
  sifreKontrol(group: FormGroup) {
    const pass = group.get('sifre').value;
    const confirmPass = group.get('sifreTekrar').value;

    return pass === confirmPass ? null : { notSame: true };
  }
  epostaKontrol(group: FormGroup) {
    const pass = group.get('eposta').value;
    const confirmPass = group.get('epostaTekrar').value;

    return pass === confirmPass ? null : { notSame: true };
  }
  kaydet() {
    let data = { ...this.form.value.uyeBilgiForm };
    this.uyeBilgiService.post(data)
      .subscribe(res => {
        this.hataMesaji = '';
        const modal = this.modalService.open(BilgiModalComponent, { centered: true });
        (modal.componentInstance as BilgiModalComponent).altBaslik = '';
        (modal.componentInstance as BilgiModalComponent).butonMetin = 'TAMAM';
        (modal.componentInstance as BilgiModalComponent).icerik = 'Kayıt İşleminiz Başarılı.';
        (modal.componentInstance as BilgiModalComponent).ustBaslik = 'Başarılı.';
        modal.result.then((res) => {
          this.router.navigate(['']);
        });
      }, (error: HttpErrorResponse) => {
        // this.hataMesaji = error.message;
        // Object.keys(error.error).forEach(key => {
        //   this.hataMesaji = error.error[key];
        // });
      });

  }
  next() {
    // this.stepper.next();
    this.hataMesaji = '';
  }
  previous() {
    // this.stepper.previous();
    this.hataMesaji = '';
  }
  ngOnDestroy(): void {
    if (this.authServiceSub$) {
      this.authServiceSub$.unsubscribe();
    }
  }
  validateEmailNotTaken(control: AbstractControl) {
    return this.authService.epostaKontrol(control.value).pipe(map(res => {
      let result = !res.isExist ? null : { taken: true };
      return result;
    }));
  }
  validateIdentityNotTaken(control: AbstractControl) {
    return this.authService.tCKimlikNoKontrol(control.value).pipe(map(res => {
      let result = !res.isExist ? null : { taken: true };
      return result;
    }));
  }
  validatePhoneNotTaken(control: AbstractControl) {
    return this.authService.telefonKontrol(control.value).pipe(map(res => {
      let result = !res.isExist ? null : { taken: true };
      return result;
    }));
  }
}
