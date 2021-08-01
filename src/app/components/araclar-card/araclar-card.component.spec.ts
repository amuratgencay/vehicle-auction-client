import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AraclarCardComponent } from './araclar-card.component';

describe('AraclarCardComponent', () => {
  let component: AraclarCardComponent;
  let fixture: ComponentFixture<AraclarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AraclarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AraclarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
