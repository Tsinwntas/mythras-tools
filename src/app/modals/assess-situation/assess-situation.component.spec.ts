import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessSituationComponent } from './assess-situation.component';

describe('AssessSituationComponent', () => {
  let component: AssessSituationComponent;
  let fixture: ComponentFixture<AssessSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessSituationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
