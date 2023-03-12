import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponsNotCoveredComponent } from './weapons-not-covered.component';

describe('WeaponsNotCoveredComponent', () => {
  let component: WeaponsNotCoveredComponent;
  let fixture: ComponentFixture<WeaponsNotCoveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponsNotCoveredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponsNotCoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
