import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultComponent } from './cult.component';

describe('CultComponent', () => {
  let component: CultComponent;
  let fixture: ComponentFixture<CultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
