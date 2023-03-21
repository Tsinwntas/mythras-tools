import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCombatStylesComponent } from './all-combat-styles.component';

describe('AllCombatStylesComponent', () => {
  let component: AllCombatStylesComponent;
  let fixture: ComponentFixture<AllCombatStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCombatStylesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCombatStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
