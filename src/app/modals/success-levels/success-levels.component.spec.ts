import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessLevelsComponent } from './success-levels.component';

describe('SuccessLevelsComponent', () => {
  let component: SuccessLevelsComponent;
  let fixture: ComponentFixture<SuccessLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessLevelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
