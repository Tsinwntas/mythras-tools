import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountedCombatComponent } from './mounted-combat.component';

describe('MountedCombatComponent', () => {
  let component: MountedCombatComponent;
  let fixture: ComponentFixture<MountedCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MountedCombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountedCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
