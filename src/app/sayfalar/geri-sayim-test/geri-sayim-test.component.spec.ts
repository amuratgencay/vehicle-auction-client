import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeriSayimTestComponent } from './geri-sayim-test.component';

describe('GeriSayimTestComponent', () => {
  let component: GeriSayimTestComponent;
  let fixture: ComponentFixture<GeriSayimTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeriSayimTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeriSayimTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
