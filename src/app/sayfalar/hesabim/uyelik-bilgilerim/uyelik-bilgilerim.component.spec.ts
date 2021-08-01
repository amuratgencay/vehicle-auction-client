import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UyelikBilgilerimComponent } from './uyelik-bilgilerim.component';

describe('UyelikBilgilerimComponent', () => {
  let component: UyelikBilgilerimComponent;
  let fixture: ComponentFixture<UyelikBilgilerimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyelikBilgilerimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyelikBilgilerimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
