import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../../utils/must-match-validator';
import { AuthService, SifreSifirlaDTO, SifreSifirlaSonucDTO } from '@zyazilim/online-ihale-data';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthManagementService } from '../../utils/auth-management.service';

@Component({
  selector: 'app-sifre-sifirla',
  templateUrl: './sifre-sifirla.component.html',
  styleUrls: ['./sifre-sifirla.component.scss']
})
export class SifreSifirlaComponent implements OnInit {
  code: any;
  form: FormGroup;
  sonuc: SifreSifirlaSonucDTO;
  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private authService: AuthService,
    private authMngSvc: AuthManagementService
  ) {
    this.form = this.formBuilder.group({
      sifre: new FormControl('', [Validators.required]),
      sifreTekrar: new FormControl('', [Validators.required]),
    }, { validators: [MustMatch('sifre', 'sifreTekrar')] });
  }

  ngOnInit() {
    this.code = this.router.snapshot.params.code;
  }
  kaydet() {
    this.sonuc = null;
    let dto = new SifreSifirlaDTO();
    dto.sifre = this.form.get('sifre').value;
    dto.sifreSifirlamaKodu = this.code;
    this.authService.sifreSifirla(dto)
      .subscribe(d => {
        this.sonuc = d;
      });
  }
  login() {
    this.authMngSvc.openLoginModal('/');
  }
}
