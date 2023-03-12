import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackOptionsComponent } from './attack-options.component';

describe('AttackOptionsComponent', () => {
  let component: AttackOptionsComponent;
  let fixture: ComponentFixture<AttackOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttackOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
