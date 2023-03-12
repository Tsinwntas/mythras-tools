import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyWeaponComponent } from './ready-weapon.component';

describe('ReadyWeaponComponent', () => {
  let component: ReadyWeaponComponent;
  let fixture: ComponentFixture<ReadyWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyWeaponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
