import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SifreDegistirComponent } from '../sifre-degistir/sifre-degistir.component';
import { UyeBilgiService, SehirDTO, SehirService, AuthServiceExtended } from '@zyazilim/online-ihale-data';

@Component({
  selector: 'app-uyelik-bilgilerim',
  templateUrl: './uyelik-bilgilerim.component.html',
  styleUrls: ['./uyelik-bilgilerim.component.scss']
})
export class UyelikBilgilerimComponent implements OnInit {
  uyeKayitForm: FormGroup;
  sehirler: SehirDTO[];
  id: string;

  get f() { return this.uyeKayitForm.controls; }
  constructor(private uyeBilgiService: UyeBilgiService,
    private formBuilder: FormBuilder,
    private sehirService: SehirService,
    private modalService: NgbModal,
    private authService: AuthServiceExtended) {
    sehirService.getAll()
      .subscribe(data => this.sehirler = data);
    this.uyeKayitForm = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl('', [Validators.required]),
      eposta: new FormControl('', [Validators.required, Validators.email]),
      tcKimlikNo: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      sehirId: new FormControl('', [Validators.required]),
      adres: new FormControl('', [Validators.required]),
    });
    this.id = this.authService.getToken().userId;
  }

  ngOnInit() {
    this.getData();
  }
  private getData() {
    this.uyeBilgiService.get(this.id)
      .subscribe(data => {
        this.uyeKayitForm.patchValue(data);
      });
  }

  guncelle() {
    this.uyeBilgiService.put(this.id, this.uyeKayitForm.value)
      .subscribe(data => {
        this.uyeKayitForm.patchValue(data);
      })
  }
  sifreDegistir() {
    this.modalService.open(SifreDegistirComponent)
      .result.then(d => {
        this.getData();
      });
  }
}
