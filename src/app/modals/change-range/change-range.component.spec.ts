import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRangeComponent } from './change-range.component';

describe('ChangeRangeComponent', () => {
  let component: ChangeRangeComponent;
  let fixture: ComponentFixture<ChangeRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
