import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleTeklifSesComponent } from './ihale-teklif-ses.component';

describe('IhaleTeklifSesComponent', () => {
  let component: IhaleTeklifSesComponent;
  let fixture: ComponentFixture<IhaleTeklifSesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleTeklifSesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleTeklifSesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
