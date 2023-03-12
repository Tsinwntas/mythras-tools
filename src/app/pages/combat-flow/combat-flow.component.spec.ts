import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatFlowComponent } from './combat-flow.component';

describe('CombatFlowComponent', () => {
  let component: CombatFlowComponent;
  let fixture: ComponentFixture<CombatFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
