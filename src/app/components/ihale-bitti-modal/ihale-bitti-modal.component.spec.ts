import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhaleBittiModalComponent } from './ihale-bitti-modal.component';

describe('IhaleBittiModalComponent', () => {
  let component: IhaleBittiModalComponent;
  let fixture: ComponentFixture<IhaleBittiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhaleBittiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhaleBittiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
