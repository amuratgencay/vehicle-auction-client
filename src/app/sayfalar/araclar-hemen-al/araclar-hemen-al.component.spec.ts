import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AraclarHemenAlComponent } from './araclar-hemen-al.component';

describe('AraclarHemenAlComponent', () => {
  let component: AraclarHemenAlComponent;
  let fixture: ComponentFixture<AraclarHemenAlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AraclarHemenAlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AraclarHemenAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
