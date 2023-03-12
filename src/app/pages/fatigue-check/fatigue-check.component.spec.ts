import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatigueCheckComponent } from './fatigue-check.component';

describe('FatigueCheckComponent', () => {
  let component: FatigueCheckComponent;
  let fixture: ComponentFixture<FatigueCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatigueCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatigueCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
