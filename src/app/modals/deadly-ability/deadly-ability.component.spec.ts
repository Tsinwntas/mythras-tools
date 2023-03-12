import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlyAbilityComponent } from './deadly-ability.component';

describe('DeadlyAbilityComponent', () => {
  let component: DeadlyAbilityComponent;
  let fixture: ComponentFixture<DeadlyAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeadlyAbilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeadlyAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
