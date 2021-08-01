import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bilgi-modal',
  templateUrl: './bilgi-modal.component.html',
  styleUrls: ['./bilgi-modal.component.scss']
})
export class BilgiModalComponent implements OnInit {
  @Input() altBaslik;
  @Input() ustBaslik;
  @Input() icerik;
  @Input() butonMetin;
  @Input() unlemGoster: boolean;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
