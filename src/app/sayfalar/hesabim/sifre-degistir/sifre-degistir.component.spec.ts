import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SifreDegistirComponent } from './sifre-degistir.component';

describe('SifreDegistirComponent', () => {
  let component: SifreDegistirComponent;
  let fixture: ComponentFixture<SifreDegistirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SifreDegistirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SifreDegistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
