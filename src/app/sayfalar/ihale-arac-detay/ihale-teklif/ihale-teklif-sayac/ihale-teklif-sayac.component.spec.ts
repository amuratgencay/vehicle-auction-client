import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleTeklifSayacComponent } from './ihale-teklif-sayac.component';

describe('IhaleTeklifSayacComponent', () => {
  let component: IhaleTeklifSayacComponent;
  let fixture: ComponentFixture<IhaleTeklifSayacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleTeklifSayacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleTeklifSayacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
