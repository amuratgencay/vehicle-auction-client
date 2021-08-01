import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElitUyelikGecisComponent } from './elit-uyelik-gecis.component';

describe('ElitUyelikGecisComponent', () => {
  let component: ElitUyelikGecisComponent;
  let fixture: ComponentFixture<ElitUyelikGecisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElitUyelikGecisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElitUyelikGecisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
