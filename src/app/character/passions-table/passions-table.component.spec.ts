import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassionsTableComponent } from './passions-table.component';

describe('PassionsTableComponent', () => {
  let component: PassionsTableComponent;
  let fixture: ComponentFixture<PassionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassionsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
