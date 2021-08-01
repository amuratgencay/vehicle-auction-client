import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleTeklifButonlarComponent } from './ihale-teklif-butonlar.component';

describe('IhaleTeklifButonlarComponent', () => {
  let component: IhaleTeklifButonlarComponent;
  let fixture: ComponentFixture<IhaleTeklifButonlarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleTeklifButonlarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleTeklifButonlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
