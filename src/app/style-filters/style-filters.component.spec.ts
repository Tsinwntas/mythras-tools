import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFiltersComponent } from './style-filters.component';

describe('StyleFiltersComponent', () => {
  let component: StyleFiltersComponent;
  let fixture: ComponentFixture<StyleFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
