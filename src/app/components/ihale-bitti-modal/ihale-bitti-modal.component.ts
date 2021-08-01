import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KapananIhale } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-ihale-bitti-modal',
  templateUrl: './ihale-bitti-modal.component.html',
  styleUrls: ['./ihale-bitti-modal.component.scss']
})
export class IhaleBittiModalComponent implements OnInit {
  @Input() kapananIhale: KapananIhale;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
