import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiringIntoCrowdComponent } from './firing-into-crowd.component';

describe('FiringIntoCrowdComponent', () => {
  let component: FiringIntoCrowdComponent;
  let fixture: ComponentFixture<FiringIntoCrowdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiringIntoCrowdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiringIntoCrowdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
