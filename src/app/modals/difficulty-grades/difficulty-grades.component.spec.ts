import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyGradesComponent } from './difficulty-grades.component';

describe('DifficultyGradesComponent', () => {
  let component: DifficultyGradesComponent;
  let fixture: ComponentFixture<DifficultyGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
