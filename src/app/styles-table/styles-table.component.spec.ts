import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesTableComponent } from './styles-table.component';

describe('StylesTableComponent', () => {
  let component: StylesTableComponent;
  let fixture: ComponentFixture<StylesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
