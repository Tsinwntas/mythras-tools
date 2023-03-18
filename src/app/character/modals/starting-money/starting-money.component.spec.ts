import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingMoneyComponent } from './starting-money.component';

describe('StartingMoneyComponent', () => {
  let component: StartingMoneyComponent;
  let fixture: ComponentFixture<StartingMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
