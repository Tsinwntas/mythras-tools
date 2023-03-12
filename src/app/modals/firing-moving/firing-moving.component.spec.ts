import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiringMovingComponent } from './firing-moving.component';

describe('FiringMovingComponent', () => {
  let component: FiringMovingComponent;
  let fixture: ComponentFixture<FiringMovingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiringMovingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiringMovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
