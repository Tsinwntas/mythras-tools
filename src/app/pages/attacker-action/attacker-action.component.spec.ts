import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackerActionComponent } from './attacker-action.component';

describe('AttackerActionComponent', () => {
  let component: AttackerActionComponent;
  let fixture: ComponentFixture<AttackerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackerActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
