import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOfCombatCycleComponent } from './start-of-combat-cycle.component';

describe('StartOfCombatCycleComponent', () => {
  let component: StartOfCombatCycleComponent;
  let fixture: ComponentFixture<StartOfCombatCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartOfCombatCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartOfCombatCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
