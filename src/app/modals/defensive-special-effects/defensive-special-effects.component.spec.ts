import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensiveSpecialEffectsComponent } from './defensive-special-effects.component';

describe('DefensiveSpecialEffectsComponent', () => {
  let component: DefensiveSpecialEffectsComponent;
  let fixture: ComponentFixture<DefensiveSpecialEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefensiveSpecialEffectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensiveSpecialEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
