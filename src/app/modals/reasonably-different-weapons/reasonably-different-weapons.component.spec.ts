import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonablyDifferentWeaponsComponent } from './reasonably-different-weapons.component';

describe('ReasonablyDifferentWeaponsComponent', () => {
  let component: ReasonablyDifferentWeaponsComponent;
  let fixture: ComponentFixture<ReasonablyDifferentWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonablyDifferentWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonablyDifferentWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
