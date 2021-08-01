import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeriSayimComponent } from './geri-sayim.component';

describe('GeriSayimComponent', () => {
  let component: GeriSayimComponent;
  let fixture: ComponentFixture<GeriSayimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeriSayimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeriSayimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
