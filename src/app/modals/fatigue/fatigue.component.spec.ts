import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatigueComponent } from './fatigue.component';

describe('FatigueComponent', () => {
  let component: FatigueComponent;
  let fixture: ComponentFixture<FatigueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatigueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatigueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
