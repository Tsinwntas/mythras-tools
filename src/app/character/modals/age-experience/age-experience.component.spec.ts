import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeExperienceModalComponent } from './age-experience.component';

describe('AgeExperienceComponent', () => {
  let component: AgeExperienceModalComponent;
  let fixture: ComponentFixture<AgeExperienceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeExperienceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
