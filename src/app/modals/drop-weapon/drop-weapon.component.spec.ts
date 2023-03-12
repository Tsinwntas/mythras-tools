import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropWeaponComponent } from './drop-weapon.component';

describe('DropWeaponComponent', () => {
  let component: DropWeaponComponent;
  let fixture: ComponentFixture<DropWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropWeaponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
