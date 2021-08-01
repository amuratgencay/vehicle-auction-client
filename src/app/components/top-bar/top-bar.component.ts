import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../sayfalar/login/login.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  modal: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  login() {
    this.modal = this.modalService.open(LoginComponent)
    this.modal.result.then(() => {

    })
  }
}
