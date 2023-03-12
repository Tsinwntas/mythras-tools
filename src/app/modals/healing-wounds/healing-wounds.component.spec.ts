import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingWoundsComponent } from './healing-wounds.component';

describe('HealingWoundsComponent', () => {
  let component: HealingWoundsComponent;
  let fixture: ComponentFixture<HealingWoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealingWoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealingWoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
