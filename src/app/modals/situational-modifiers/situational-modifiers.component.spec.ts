import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationalModifiersComponent } from './situational-modifiers.component';

describe('SituationalModifiersComponent', () => {
  let component: SituationalModifiersComponent;
  let fixture: ComponentFixture<SituationalModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituationalModifiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituationalModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
