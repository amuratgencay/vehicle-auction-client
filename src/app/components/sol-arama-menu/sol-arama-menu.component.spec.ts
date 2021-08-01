import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolAramaMenuComponent } from './sol-arama-menu.component';

describe('SolAramaMenuComponent', () => {
  let component: SolAramaMenuComponent;
  let fixture: ComponentFixture<SolAramaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolAramaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolAramaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
