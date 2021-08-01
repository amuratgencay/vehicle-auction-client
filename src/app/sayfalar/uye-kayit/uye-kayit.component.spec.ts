import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UyeKayitComponent } from './uye-kayit.component';

describe('UyeKayitComponent', () => {
  let component: UyeKayitComponent;
  let fixture: ComponentFixture<UyeKayitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyeKayitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyeKayitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
