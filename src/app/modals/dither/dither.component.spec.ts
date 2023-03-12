import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitherComponent } from './dither.component';

describe('DitherComponent', () => {
  let component: DitherComponent;
  let fixture: ComponentFixture<DitherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DitherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DitherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
