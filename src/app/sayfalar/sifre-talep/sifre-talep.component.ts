import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService, SifreTalepEtSonucDTO } from '@zyazilim/online-ihale-data';
import { AuthManagementService } from '../../utils/auth-management.service';
import { timer, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-sifre-talep',
  templateUrl: './sifre-talep.component.html',
  styleUrls: ['./sifre-talep.component.scss']
})
export class SifreTalepComponent implements OnInit {
  form: FormGroup;
  counter$: Observable<number>;
  count = 0;
  sonuc: SifreTalepEtSonucDTO;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authMngSvc: AuthManagementService
  ) {
    this.form = this.formBuilder.group({
      eposta: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  }
  gonder() {
    this.sonuc = null;
    this.authService.sifreTalepEt(this.form.get('eposta').value)
      .subscribe(d => {
        this.sonuc = d;
        this.count = 60;
        this.counter$ = timer(0, 1000).pipe(
          take(this.count),
          map(() => {
            return --this.count
          })
        );
      });
  }
  login() {
    this.authMngSvc.openLoginModal('/');
  }
}
