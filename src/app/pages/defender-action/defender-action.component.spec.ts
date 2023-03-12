import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenderActionComponent } from './defender-action.component';

describe('DefenderActionComponent', () => {
  let component: DefenderActionComponent;
  let fixture: ComponentFixture<DefenderActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefenderActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenderActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
