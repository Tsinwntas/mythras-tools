import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEventsModalComponent } from './background-events-modal.component';

describe('BackgroundEventsModalComponent', () => {
  let component: BackgroundEventsModalComponent;
  let fixture: ComponentFixture<BackgroundEventsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundEventsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundEventsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
