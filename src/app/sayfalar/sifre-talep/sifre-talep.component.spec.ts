import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SifreTalepComponent } from './sifre-talep.component';

describe('SifreTalepComponent', () => {
  let component: SifreTalepComponent;
  let fixture: ComponentFixture<SifreTalepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SifreTalepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SifreTalepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
