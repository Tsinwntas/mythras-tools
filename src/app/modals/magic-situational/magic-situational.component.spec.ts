import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicSituationalComponent } from './magic-situational.component';

describe('MagicSituationalComponent', () => {
  let component: MagicSituationalComponent;
  let fixture: ComponentFixture<MagicSituationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicSituationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicSituationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
