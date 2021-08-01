import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SifreSifirlaComponent } from './sifre-sifirla.component';

describe('SifreSifirlaComponent', () => {
  let component: SifreSifirlaComponent;
  let fixture: ComponentFixture<SifreSifirlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SifreSifirlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SifreSifirlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
