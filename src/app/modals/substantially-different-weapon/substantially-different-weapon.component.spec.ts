import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstantiallyDifferentWeaponComponent } from './substantially-different-weapon.component';

describe('SubstantiallyDifferentWeaponComponent', () => {
  let component: SubstantiallyDifferentWeaponComponent;
  let fixture: ComponentFixture<SubstantiallyDifferentWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstantiallyDifferentWeaponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstantiallyDifferentWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
