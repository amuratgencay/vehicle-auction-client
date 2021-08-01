import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracCardComponent } from './arac-card.component';

describe('AracCardComponent', () => {
  let component: AracCardComponent;
  let fixture: ComponentFixture<AracCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
