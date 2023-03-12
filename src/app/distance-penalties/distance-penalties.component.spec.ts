import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistancePenaltiesComponent } from './distance-penalties.component';

describe('DistancePenaltiesComponent', () => {
  let component: DistancePenaltiesComponent;
  let fixture: ComponentFixture<DistancePenaltiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistancePenaltiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistancePenaltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
