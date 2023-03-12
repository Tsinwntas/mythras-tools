import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicInCombatComponent } from './magic-in-combat.component';

describe('MagicInCombatComponent', () => {
  let component: MagicInCombatComponent;
  let fixture: ComponentFixture<MagicInCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicInCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicInCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
