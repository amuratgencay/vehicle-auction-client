import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltBannerComponent } from './alt-banner.component';

describe('AltBannerComponent', () => {
  let component: AltBannerComponent;
  let fixture: ComponentFixture<AltBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
