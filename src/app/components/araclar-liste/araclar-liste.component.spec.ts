import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AraclarListeComponent } from './araclar-liste.component';

describe('AraclarListeComponent', () => {
  let component: AraclarListeComponent;
  let fixture: ComponentFixture<AraclarListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AraclarListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AraclarListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
