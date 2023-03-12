import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalSpecialsComponent } from './natural-specials.component';

describe('NaturalSpecialsComponent', () => {
  let component: NaturalSpecialsComponent;
  let fixture: ComponentFixture<NaturalSpecialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturalSpecialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturalSpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
