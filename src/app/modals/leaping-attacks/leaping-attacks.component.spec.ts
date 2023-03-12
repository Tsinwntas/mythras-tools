import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapingAttacksComponent } from './leaping-attacks.component';

describe('LeapingAttacksComponent', () => {
  let component: LeapingAttacksComponent;
  let fixture: ComponentFixture<LeapingAttacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapingAttacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapingAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
