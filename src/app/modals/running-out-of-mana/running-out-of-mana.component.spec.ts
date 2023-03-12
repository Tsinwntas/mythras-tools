import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningOutOfManaComponent } from './running-out-of-mana.component';

describe('RunningOutOfManaComponent', () => {
  let component: RunningOutOfManaComponent;
  let fixture: ComponentFixture<RunningOutOfManaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningOutOfManaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningOutOfManaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
