import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockbackComponent } from './knockback.component';

describe('KnockbackComponent', () => {
  let component: KnockbackComponent;
  let fixture: ComponentFixture<KnockbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnockbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnockbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
