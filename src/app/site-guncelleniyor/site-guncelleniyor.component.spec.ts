import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteGuncelleniyorComponent } from './site-guncelleniyor.component';

describe('SiteGuncelleniyorComponent', () => {
  let component: SiteGuncelleniyorComponent;
  let fixture: ComponentFixture<SiteGuncelleniyorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteGuncelleniyorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteGuncelleniyorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
