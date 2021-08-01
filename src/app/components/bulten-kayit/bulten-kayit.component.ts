import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilgiModalComponent } from '../bilgi-modal/bilgi-modal.component';
import { BultenService } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-bulten-kayit',
  templateUrl: './bulten-kayit.component.html',
  styleUrls: ['./bulten-kayit.component.scss']
})
export class BultenKayitComponent implements OnInit {
  form = new FormGroup({
    eposta: new FormControl('', [Validators.email, Validators.required]),
  });
  get f() { return this.form.controls; }
  constructor(private bultenService: BultenService,
    private modal: NgbModal) { }

  ngOnInit() {
  }
  kaydet() {
    this.bultenService.post(this.form.value)
      .subscribe(res => {
        if (res.id) {
          let modalInstance = this.modal.open(BilgiModalComponent, { centered: true }).componentInstance;
          (modalInstance as BilgiModalComponent).butonMetin = 'TAMAM';
          (modalInstance as BilgiModalComponent).icerik = 'Bülten kaydınız gerçekleşmiştir.';
          (modalInstance as BilgiModalComponent).ustBaslik = 'Başarılı';
        }
        this.form.get('eposta').setValue(null);
        this.form.markAsUntouched();
      }, error => {
      
        this.form.get('eposta').setValue(null);
        this.form.markAsUntouched();
      })
  }
}
