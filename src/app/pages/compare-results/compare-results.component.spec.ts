import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareResultsComponent } from './compare-results.component';

describe('CompareResultsComponent', () => {
  let component: CompareResultsComponent;
  let fixture: ComponentFixture<CompareResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
