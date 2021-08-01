import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from '../../../utils/must-match-validator';
import { AuthService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-sifre-degistir',
  templateUrl: './sifre-degistir.component.html',
  styleUrls: ['./sifre-degistir.component.scss']
})
export class SifreDegistirComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  errorMesaj: string;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.form = this.formBuilder.group({
      eskiSifre: new FormControl('', [Validators.required]),
      yeniSifre: new FormControl('', [Validators.required]),
      sifreTekrar: new FormControl('', [Validators.required]),
    }, { validators: [MustMatch('yeniSifre', 'sifreTekrar')] })
  }
  ngOnInit() {

  }
  kaydet() {
    this.errorMesaj = '';
    this.authService.sifreDegistir(this.form.value)
      .subscribe(data => {
        if (data.sonuc) {
          this.activeModal.close();
        } else {
          this.errorMesaj = data.mesaj;
        }
      }, error => {
        this.errorMesaj = error.error.message;
      })
  }

}
