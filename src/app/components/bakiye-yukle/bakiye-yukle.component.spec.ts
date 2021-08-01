import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakiyeYukleComponent } from './bakiye-yukle.component';

describe('BakiyeYukleComponent', () => {
  let component: BakiyeYukleComponent;
  let fixture: ComponentFixture<BakiyeYukleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakiyeYukleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakiyeYukleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
