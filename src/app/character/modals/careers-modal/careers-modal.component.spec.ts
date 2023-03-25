import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersModalComponent } from './careers-modal.component';

describe('CareersModalComponent', () => {
  let component: CareersModalComponent;
  let fixture: ComponentFixture<CareersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
