import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOfCombatRoundComponent } from './start-of-combat-round.component';

describe('StartOfCombatRoundComponent', () => {
  let component: StartOfCombatRoundComponent;
  let fixture: ComponentFixture<StartOfCombatRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartOfCombatRoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartOfCombatRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
