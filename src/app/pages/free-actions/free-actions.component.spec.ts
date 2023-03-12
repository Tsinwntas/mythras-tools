import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeActionsComponent } from './free-actions.component';

describe('FreeActionsComponent', () => {
  let component: FreeActionsComponent;
  let fixture: ComponentFixture<FreeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
