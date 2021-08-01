import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleTeklifComponent } from './ihale-teklif.component';

describe('IhaleTeklifComponent', () => {
  let component: IhaleTeklifComponent;
  let fixture: ComponentFixture<IhaleTeklifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleTeklifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleTeklifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
