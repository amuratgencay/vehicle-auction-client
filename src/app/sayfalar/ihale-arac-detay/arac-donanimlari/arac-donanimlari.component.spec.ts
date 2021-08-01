import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracDonanimlariComponent } from './arac-donanimlari.component';

describe('AracDonanimlariComponent', () => {
  let component: AracDonanimlariComponent;
  let fixture: ComponentFixture<AracDonanimlariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracDonanimlariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracDonanimlariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
