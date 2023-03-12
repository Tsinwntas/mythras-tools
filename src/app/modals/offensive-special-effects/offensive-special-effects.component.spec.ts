import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensiveSpecialEffectsComponent } from './offensive-special-effects.component';

describe('OffensiveSpecialEffectsComponent', () => {
  let component: OffensiveSpecialEffectsComponent;
  let fixture: ComponentFixture<OffensiveSpecialEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffensiveSpecialEffectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffensiveSpecialEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
