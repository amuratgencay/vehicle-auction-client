import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracMevcutDurumComponent } from './arac-mevcut-durum.component';

describe('AracMevcutDurumComponent', () => {
  let component: AracMevcutDurumComponent;
  let fixture: ComponentFixture<AracMevcutDurumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracMevcutDurumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracMevcutDurumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
