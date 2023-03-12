import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCombatSituationalComponent } from './close-combat-situational.component';

describe('CloseCombatSituationalComponent', () => {
  let component: CloseCombatSituationalComponent;
  let fixture: ComponentFixture<CloseCombatSituationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseCombatSituationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseCombatSituationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
