import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedSituationalComponent } from './ranged-situational.component';

describe('RangedSituationalComponent', () => {
  let component: RangedSituationalComponent;
  let fixture: ComponentFixture<RangedSituationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangedSituationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangedSituationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
