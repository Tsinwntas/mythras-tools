import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeExperienceComponent } from './age-experience.component';

describe('AgeExperienceComponent', () => {
  let component: AgeExperienceComponent;
  let fixture: ComponentFixture<AgeExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
