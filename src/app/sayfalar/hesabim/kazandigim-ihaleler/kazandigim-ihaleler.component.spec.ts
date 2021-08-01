import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KazandigimIhalelerComponent } from './kazandigim-ihaleler.component';

describe('KazandigimIhalelerComponent', () => {
  let component: KazandigimIhalelerComponent;
  let fixture: ComponentFixture<KazandigimIhalelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KazandigimIhalelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KazandigimIhalelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
