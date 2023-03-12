import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimingComponent } from './aiming.component';

describe('AimingComponent', () => {
  let component: AimingComponent;
  let fixture: ComponentFixture<AimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AimingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
