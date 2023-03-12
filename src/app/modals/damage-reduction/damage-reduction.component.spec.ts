import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageReductionComponent } from './damage-reduction.component';

describe('DamageReductionComponent', () => {
  let component: DamageReductionComponent;
  let fixture: ComponentFixture<DamageReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamageReductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
