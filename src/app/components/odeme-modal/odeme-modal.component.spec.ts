import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdemeModalComponent } from './odeme-modal.component';

describe('OdemeModalComponent', () => {
  let component: OdemeModalComponent;
  let fixture: ComponentFixture<OdemeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdemeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdemeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
