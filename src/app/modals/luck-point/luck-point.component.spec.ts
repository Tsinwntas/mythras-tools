import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckPointComponent } from './luck-point.component';

describe('LuckPointComponent', () => {
  let component: LuckPointComponent;
  let fixture: ComponentFixture<LuckPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuckPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuckPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
