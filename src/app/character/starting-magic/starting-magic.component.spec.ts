import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingMagicComponent } from './starting-magic.component';

describe('StartingMagicComponent', () => {
  let component: StartingMagicComponent;
  let fixture: ComponentFixture<StartingMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartingMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
