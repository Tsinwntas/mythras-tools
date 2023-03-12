import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeCoverComponent } from './take-cover.component';

describe('TakeCoverComponent', () => {
  let component: TakeCoverComponent;
  let fixture: ComponentFixture<TakeCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakeCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
