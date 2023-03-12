import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentModalComponent } from './augment-modal.component';

describe('AugmentModalComponent', () => {
  let component: AugmentModalComponent;
  let fixture: ComponentFixture<AugmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AugmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AugmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
