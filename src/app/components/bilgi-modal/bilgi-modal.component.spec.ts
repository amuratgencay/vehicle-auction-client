import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilgiModalComponent } from './bilgi-modal.component';

describe('BilgiModalComponent', () => {
  let component: BilgiModalComponent;
  let fixture: ComponentFixture<BilgiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilgiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilgiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
