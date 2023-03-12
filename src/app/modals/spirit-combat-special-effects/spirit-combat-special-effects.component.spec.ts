import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritCombatSpecialEffectsComponent } from './spirit-combat-special-effects.component';

describe('SpiritCombatSpecialEffectsComponent', () => {
  let component: SpiritCombatSpecialEffectsComponent;
  let fixture: ComponentFixture<SpiritCombatSpecialEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiritCombatSpecialEffectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiritCombatSpecialEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
