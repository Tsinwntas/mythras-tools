import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnarmedCombatComponent } from './unarmed-combat.component';

describe('UnarmedCombatComponent', () => {
  let component: UnarmedCombatComponent;
  let fixture: ComponentFixture<UnarmedCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnarmedCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnarmedCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
