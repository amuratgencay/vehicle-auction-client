import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HakkimizdaIcerikComponent } from './hakkimizda-icerik.component';

describe('HakkimizdaIcerikComponent', () => {
  let component: HakkimizdaIcerikComponent;
  let fixture: ComponentFixture<HakkimizdaIcerikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HakkimizdaIcerikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HakkimizdaIcerikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
