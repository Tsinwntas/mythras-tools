import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedModTableComponent } from './ranged-mod-table.component';

describe('RangedModTableComponent', () => {
  let component: RangedModTableComponent;
  let fixture: ComponentFixture<RangedModTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangedModTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangedModTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
