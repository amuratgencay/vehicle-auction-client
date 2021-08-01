import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleAracDetayComponent } from './ihale-arac-detay.component';

describe('IhaleAracDetayComponent', () => {
  let component: IhaleAracDetayComponent;
  let fixture: ComponentFixture<IhaleAracDetayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleAracDetayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleAracDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
