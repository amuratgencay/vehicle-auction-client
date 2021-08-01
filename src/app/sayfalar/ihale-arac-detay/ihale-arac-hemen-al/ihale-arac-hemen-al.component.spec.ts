import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleAracHemenAlComponent } from './ihale-arac-hemen-al.component';

describe('IhaleAracHemenAlComponent', () => {
  let component: IhaleAracHemenAlComponent;
  let fixture: ComponentFixture<IhaleAracHemenAlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleAracHemenAlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleAracHemenAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
