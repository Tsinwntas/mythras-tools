import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightWeightComponent } from './height-weight.component';

describe('HeightWeightComponent', () => {
  let component: HeightWeightComponent;
  let fixture: ComponentFixture<HeightWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeightWeightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeightWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
