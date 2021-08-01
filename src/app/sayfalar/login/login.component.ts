import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService, AuthServiceExtended } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    eposta: new FormControl(''),
    sifre: new FormControl(''),
  });
  errorMesaj: string;
  constructor(public activeModal: NgbActiveModal,
    private authService: AuthServiceExtended) { }
  ngOnInit() {

  }
  login() {
    this.errorMesaj = '';
    this.authService.authenticate(this.loginForm.value)
      .subscribe(data => {
        this.activeModal.close();
      }, error => {
        this.errorMesaj = error.error.message
      })
  }
}
