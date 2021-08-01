import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { OdemeService } from './odeme.service';
import { OdemeModalComponent } from '../odeme-modal/odeme-modal.component';
import { IPaySecure } from './ipaysecure-model';
import { UtilsService } from '../../utils/utils.service';
import { UyeBilgiService, AuthService, AuthServiceExtended } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-bakiye-yukle',
  templateUrl: './bakiye-yukle.component.html',
  styleUrls: ['./bakiye-yukle.component.scss']
})
export class BakiyeYukleComponent implements OnInit {
  @ViewChild('pan1', { static: true }) pan1: ElementRef;
  @ViewChild('pan2', { static: true }) pan2: ElementRef;
  @ViewChild('pan3', { static: true }) pan3: ElementRef;
  @ViewChild('pan4', { static: true }) pan4: ElementRef;
  @ViewChild('expiryMonth', { static: true }) expiryMonth: ElementRef;
  @ViewChild('expiryYear', { static: true }) expiryYear: ElementRef;
  @ViewChild('cvv', { static: true }) cvv: ElementRef;
  form: FormGroup;
  id: string;
  enrollmentResult: string;
  iframeForm: any;
  get f() { return this.form.controls; }
  get fCreditCard() { return (this.form.get('creditCard') as FormGroup).controls; }
  constructor(private uyeBilgiService: UyeBilgiService,
    private formBuilder: FormBuilder,
    private authService: AuthServiceExtended,
    private odemeService: OdemeService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private utilsService: UtilsService) {

    this.id = this.authService.getToken().userId;
    this.form = this.formBuilder.group({
      id: new FormControl(this.id, [Validators.required]),
      creditCard: this.formBuilder.group(
        {
          cardHolderName: new FormControl('', [Validators.required]),
          brandName: new FormControl('', [Validators.required]),
          pan: new FormControl('', [Validators.required]),
          pan1: new FormControl('', [Validators.required]),
          pan2: new FormControl('', [Validators.required]),
          pan3: new FormControl('', [Validators.required]),
          pan4: new FormControl('', [Validators.required]),
          cvv: new FormControl('', [Validators.required]),
          expiryMonth: new FormControl('', [Validators.required]),
          expiryYear: new FormControl('', [Validators.required]),
        }
      ),
      purchaseAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      onay: new FormControl(false, [Validators.requiredTrue]),
    });
    this.form.get('creditCard').get('pan1').valueChanges.subscribe(d => {
      if (d.length === 4) {
        this.pan2.nativeElement.focus();
        this.changePan();
      }
    });
    this.form.get('creditCard').get('pan2').valueChanges.subscribe(d => {
      if (d.length === 4) {
        this.pan3.nativeElement.focus();
        this.changePan();
      }
    });
    this.form.get('creditCard').get('pan3').valueChanges.subscribe(d => {
      if (d.length === 4) {
        this.pan4.nativeElement.focus();
        this.changePan();
      }
    });
    this.form.get('creditCard').get('pan4').valueChanges.subscribe(d => {
      if (d.length === 4) {
        this.expiryMonth.nativeElement.focus();
        this.changePan();
      }
    });
    this.form.get('creditCard').get('expiryMonth').valueChanges.subscribe(d => {
      if (d.length === 2) {
        this.expiryYear.nativeElement.focus();
      }
    });
    this.form.get('creditCard').get('expiryYear').valueChanges.subscribe(d => {
      if (d.length === 2) {
        this.cvv.nativeElement.focus();
      }
    });
    this.form.get('creditCard').get('pan').valueChanges.subscribe(d => {
      let cardType = utilsService.isValidCreditCardNumber(d);
      let brand = 100;
      if (cardType) {
        switch (cardType) {
          case 'visa':
            brand = 100;
            break;
          case 'mastercard':
            brand = 200;
            break;
          case 'americanexpress':
            brand = 300;
            break;
          default:
            brand = 100;
            break;
        }
      }
      this.form.get('creditCard').get('brandName').setValue(brand);
    });
  }
  ngOnInit(): void {

  }
  changePan() {
    // tslint:disable-next-line: max-line-length
    this.form.get('creditCard').get('pan').setValue(this.form.get('creditCard').get('pan1').value + this.form.get('creditCard').get('pan2').value + this.form.get('creditCard').get('pan3').value + this.form.get('creditCard').get('pan4').value)
  }
  yukle() {
    this.enrollmentResult = '';
    this.odemeService.enrollment(this.form.value).subscribe(d => {
      if (d.veRes.status === 'Y') {
        this.openPaymentModal(d);
      } else if (d.veRes.status === 'N') {
        this.enrollmentResult = 'Kartınız 3D Secure açık olmadığı için işlem yapılamıyor';
      } else {
        if (d.resultDetail.errorCode === 2029 || d.resultDetail.errorCode === 1010) {
          this.enrollmentResult = 'Kart numarasını hatalı girdiniz.';
        } else if (d.resultDetail.errorCode === 2030 || d.resultDetail.errorCode === 1009) {
          this.enrollmentResult = 'Kart geçerlilik tarihini hatalı girdiniz.';
        } else {
          this.enrollmentResult = `Sistem yöneticisi ile irtibata geçin. Hata Kodu ${d.resultDetail.errorCode}`;
        }
      }
    });

    // this.uyeBilgiService.bakiyeYukle(this.id, this.form.value)
    //   .subscribe(d => {
    //     this.modal.close(d);
    //   });
  }
  openPaymentModal(paySecure: IPaySecure) {
    const paymentModalRef = this.modalService.open(OdemeModalComponent, { windowClass: 'hugeModal' });
    (paymentModalRef.componentInstance as OdemeModalComponent).paySecure = paySecure;
    // (paymentModalRef.componentInstance as OdemeModalComponent).form = this.odemeForm;
    paymentModalRef.result.then((result) => {
      if (result.resultCode !== '0000') {
        this.enrollmentResult = result.resultDetail;
      } else {
        this.modal.close();
      }
    }, (reason) => {
      this.enrollmentResult = 'İşlem tamamlanmadan ekran kapatıldı.';
    });
  }
}
