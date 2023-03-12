import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParryComponent } from './parry.component';

describe('ParryComponent', () => {
  let component: ParryComponent;
  let fixture: ComponentFixture<ParryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
