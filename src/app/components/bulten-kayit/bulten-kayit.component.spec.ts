import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BultenKayitComponent } from './bulten-kayit.component';

describe('BultenKayitComponent', () => {
  let component: BultenKayitComponent;
  let fixture: ComponentFixture<BultenKayitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BultenKayitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BultenKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
