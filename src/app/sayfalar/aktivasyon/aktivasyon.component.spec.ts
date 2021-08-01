import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivasyonComponent } from './aktivasyon.component';

describe('AktivasyonComponent', () => {
  let component: AktivasyonComponent;
  let fixture: ComponentFixture<AktivasyonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivasyonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivasyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
