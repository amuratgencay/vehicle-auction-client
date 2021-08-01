import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BakiyeYukleComponent } from '../../components/bakiye-yukle/bakiye-yukle.component';
import { UyeBilgiDTO, UyeBilgiService, AuthServiceExtended, TokenDTO } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-hesabim',
  templateUrl: './hesabim.component.html',
  styleUrls: ['./hesabim.component.scss']
})
export class HesabimComponent implements OnInit {
  turuncu: string = "#ffa178"
  beyaz: string = "#fff"
  uyeBilgi: UyeBilgiDTO;
  public get user(): TokenDTO {
    return this.authService.getToken();
  }
  constructor(private uyeBilgiService: UyeBilgiService,
    private authService: AuthServiceExtended,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.uyeBilgiService.get(this.user.userId)
      .subscribe(d => {
        this.uyeBilgi = d;
      });
  }
  bakiyeYukle() {
    let modal = this.modalService.open(BakiyeYukleComponent, { centered: true });
    modal.result.then(() => {
    }, (res) => {
    });
  }
}
