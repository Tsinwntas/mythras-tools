import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundEventsComponent } from './background-events.component';

describe('BackgroundEventsComponent', () => {
  let component: BackgroundEventsComponent;
  let fixture: ComponentFixture<BackgroundEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
