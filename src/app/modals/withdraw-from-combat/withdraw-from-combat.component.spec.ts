import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFromCombatComponent } from './withdraw-from-combat.component';

describe('WithdrawFromCombatComponent', () => {
  let component: WithdrawFromCombatComponent;
  let fixture: ComponentFixture<WithdrawFromCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawFromCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawFromCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
