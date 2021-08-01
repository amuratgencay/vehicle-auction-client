import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bakiye-yukle',
  templateUrl: './bakiye-yukle.component.html',
  styleUrls: ['./bakiye-yukle.component.scss']
})
export class BakiyeYukleComponent implements OnInit {
  constructor(private modalService: NgbModal) {

  }
  ngOnInit(): void {

  }
  bakiyeYukle() {
    let modal = this.modalService.open(BakiyeYukleComponent, { centered: true });
    modal.result.then(() => {
    }, () => {
    });
  }
}
