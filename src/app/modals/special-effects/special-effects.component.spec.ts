import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialEffectsComponent } from './special-effects.component';

describe('SpecialEffectsComponent', () => {
  let component: SpecialEffectsComponent;
  let fixture: ComponentFixture<SpecialEffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialEffectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
