import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorPenaltyComponent } from './armor-penalty.component';

describe('ArmorPenaltyComponent', () => {
  let component: ArmorPenaltyComponent;
  let fixture: ComponentFixture<ArmorPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorPenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmorPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
