import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfCycleComponent } from './end-of-cycle.component';

describe('EndOfCycleComponent', () => {
  let component: EndOfCycleComponent;
  let fixture: ComponentFixture<EndOfCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndOfCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndOfCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
