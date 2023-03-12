import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncPenaltyComponent } from './enc-penalty.component';

describe('EncPenaltyComponent', () => {
  let component: EncPenaltyComponent;
  let fixture: ComponentFixture<EncPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncPenaltyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
