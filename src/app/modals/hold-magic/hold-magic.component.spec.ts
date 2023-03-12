import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldMagicComponent } from './hold-magic.component';

describe('HoldMagicComponent', () => {
  let component: HoldMagicComponent;
  let fixture: ComponentFixture<HoldMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
