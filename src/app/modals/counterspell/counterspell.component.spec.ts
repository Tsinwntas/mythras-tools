import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterspellComponent } from './counterspell.component';

describe('CounterspellComponent', () => {
  let component: CounterspellComponent;
  let fixture: ComponentFixture<CounterspellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterspellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterspellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
