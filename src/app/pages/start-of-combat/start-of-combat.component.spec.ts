import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOfCombatComponent } from './start-of-combat.component';

describe('StartOfCombatComponent', () => {
  let component: StartOfCombatComponent;
  let fixture: ComponentFixture<StartOfCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartOfCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartOfCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
