import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrappleComponent } from './grapple.component';

describe('GrappleComponent', () => {
  let component: GrappleComponent;
  let fixture: ComponentFixture<GrappleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrappleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrappleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
