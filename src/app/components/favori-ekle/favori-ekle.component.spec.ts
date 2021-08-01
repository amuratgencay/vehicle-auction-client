import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriEkleComponent } from './favori-ekle.component';

describe('FavoriEkleComponent', () => {
  let component: FavoriEkleComponent;
  let fixture: ComponentFixture<FavoriEkleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriEkleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
