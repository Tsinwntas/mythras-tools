import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentWeaponsComponent } from './different-weapons.component';

describe('DifferentWeaponsComponent', () => {
  let component: DifferentWeaponsComponent;
  let fixture: ComponentFixture<DifferentWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferentWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferentWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
