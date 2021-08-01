import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaSayfaCarouselComponent } from './ana-sayfa-carousel.component';

describe('AnaSayfaCarouselComponent', () => {
  let component: AnaSayfaCarouselComponent;
  let fixture: ComponentFixture<AnaSayfaCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaSayfaCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaSayfaCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
