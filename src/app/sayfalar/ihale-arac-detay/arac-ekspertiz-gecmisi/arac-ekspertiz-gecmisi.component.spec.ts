import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracEkspertizGecmisiComponent } from './arac-ekspertiz-gecmisi.component';

describe('AracEkspertizGecmisiComponent', () => {
  let component: AracEkspertizGecmisiComponent;
  let fixture: ComponentFixture<AracEkspertizGecmisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracEkspertizGecmisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracEkspertizGecmisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
