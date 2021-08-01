import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleSayfalamaBilgisiComponent } from './ihale-sayfalama-bilgisi.component';

describe('IhaleSayfalamaBilgisiComponent', () => {
  let component: IhaleSayfalamaBilgisiComponent;
  let fixture: ComponentFixture<IhaleSayfalamaBilgisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleSayfalamaBilgisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleSayfalamaBilgisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
