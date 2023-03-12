import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitLocationsComponent } from './hit-locations.component';

describe('HitLocationsComponent', () => {
  let component: HitLocationsComponent;
  let fixture: ComponentFixture<HitLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
