import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeBandComponent } from './age-band.component';

describe('AgeBandComponent', () => {
  let component: AgeBandComponent;
  let fixture: ComponentFixture<AgeBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeBandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
