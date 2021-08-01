import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../sayfalar/login/login.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthManagementService {

  constructor(private modal: NgbModal,
    private route: Router
  ) {
  }
  openLoginModal(redirectUrl: string = null) {
    const modal = this.modal.open(LoginComponent, { centered: true });
    modal.result.then(() => {
      this.route.navigateByUrl(redirectUrl);
    }, () => {
    });
  }

}
