import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatStylesComponent } from './combat-styles.component';

describe('CombatStylesComponent', () => {
  let component: CombatStylesComponent;
  let fixture: ComponentFixture<CombatStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatStylesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
