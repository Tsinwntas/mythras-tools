import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritCombatComponent } from './spirit-combat.component';

describe('SpiritCombatComponent', () => {
  let component: SpiritCombatComponent;
  let fixture: ComponentFixture<SpiritCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpiritCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpiritCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
