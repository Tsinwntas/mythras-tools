import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundingOutComponent } from './rounding-out.component';

describe('RoundingOutComponent', () => {
  let component: RoundingOutComponent;
  let fixture: ComponentFixture<RoundingOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundingOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundingOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
