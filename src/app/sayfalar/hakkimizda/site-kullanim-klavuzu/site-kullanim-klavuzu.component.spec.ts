import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteKullanimKlavuzuComponent } from './site-kullanim-klavuzu.component';

describe('SiteKullanimKlavuzuComponent', () => {
  let component: SiteKullanimKlavuzuComponent;
  let fixture: ComponentFixture<SiteKullanimKlavuzuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteKullanimKlavuzuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteKullanimKlavuzuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
