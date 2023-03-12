import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorceryInCombatComponent } from './sorcery-in-combat.component';

describe('SorceryInCombatComponent', () => {
  let component: SorceryInCombatComponent;
  let fixture: ComponentFixture<SorceryInCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorceryInCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorceryInCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
