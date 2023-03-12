import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallingAndCombatComponent } from './falling-and-combat.component';

describe('FallingAndCombatComponent', () => {
  let component: FallingAndCombatComponent;
  let fixture: ComponentFixture<FallingAndCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallingAndCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallingAndCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
