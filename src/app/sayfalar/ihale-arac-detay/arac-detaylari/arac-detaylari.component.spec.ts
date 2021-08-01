import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AracDetaylariComponent } from './arac-detaylari.component';

describe('AracDetaylariComponent', () => {
  let component: AracDetaylariComponent;
  let fixture: ComponentFixture<AracDetaylariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracDetaylariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracDetaylariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
