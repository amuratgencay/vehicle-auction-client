import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiradakiAraclarComponent } from './siradaki-araclar.component';

describe('SiradakiAraclarComponent', () => {
  let component: SiradakiAraclarComponent;
  let fixture: ComponentFixture<SiradakiAraclarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiradakiAraclarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiradakiAraclarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
