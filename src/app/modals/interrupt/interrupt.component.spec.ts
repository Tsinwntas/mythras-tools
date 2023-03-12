import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterruptComponent } from './interrupt.component';

describe('InterruptComponent', () => {
  let component: InterruptComponent;
  let fixture: ComponentFixture<InterruptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterruptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterruptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
