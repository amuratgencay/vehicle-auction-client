import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleBenzerAraclarComponent } from './ihale-benzer-araclar.component';

describe('IhaleBenzerAraclarComponent', () => {
  let component: IhaleBenzerAraclarComponent;
  let fixture: ComponentFixture<IhaleBenzerAraclarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleBenzerAraclarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleBenzerAraclarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
