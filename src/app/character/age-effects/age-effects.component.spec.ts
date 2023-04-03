import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeEffectsComponent } from './age-effects.component';

describe('AgeEffectsComponent', () => {
  let component: AgeEffectsComponent;
  let fixture: ComponentFixture<AgeEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeEffectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
