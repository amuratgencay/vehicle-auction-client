import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { IPaySecure } from '../bakiye-yukle/ipaysecure-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-odeme-modal',
  templateUrl: './odeme-modal.component.html',
  styleUrls: ['./odeme-modal.component.scss']
})
export class OdemeModalComponent implements OnInit, AfterViewInit {

  @Input() paySecure: IPaySecure;
  @ViewChild('odemeForm') odemeForm: ElementRef;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.odemeForm.nativeElement.submit();
  }
  paymentResult(e) {
    const body = e.contentWindow.document.body;
    if (body) {
      const pre = body.getElementsByTagName('pre');
      if (pre && pre.length) {
        const result: { resultCode: string, resultDetail: string } = JSON.parse(pre[0].innerHTML);
        this.modal.close(result);
      }
    }
  }
  close(e) {
    this.modal.dismiss(e);
  }
}
