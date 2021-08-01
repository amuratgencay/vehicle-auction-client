import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsatAraciCardComponent } from './firsat-araci-card.component';

describe('FirsatAraciCardComponent', () => {
  let component: FirsatAraciCardComponent;
  let fixture: ComponentFixture<FirsatAraciCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirsatAraciCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsatAraciCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
