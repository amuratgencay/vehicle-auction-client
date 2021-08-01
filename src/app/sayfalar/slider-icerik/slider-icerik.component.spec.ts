import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderIcerikComponent } from './slider-icerik.component';

describe('SliderIcerikComponent', () => {
  let component: SliderIcerikComponent;
  let fixture: ComponentFixture<SliderIcerikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderIcerikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderIcerikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
