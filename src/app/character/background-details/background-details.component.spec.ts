import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundDetailsComponent } from './background-details.component';

describe('BackgroundDetailsComponent', () => {
  let component: BackgroundDetailsComponent;
  let fixture: ComponentFixture<BackgroundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
