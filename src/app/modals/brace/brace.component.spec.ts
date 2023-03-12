import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BraceComponent } from './brace.component';

describe('BraceComponent', () => {
  let component: BraceComponent;
  let fixture: ComponentFixture<BraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BraceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
