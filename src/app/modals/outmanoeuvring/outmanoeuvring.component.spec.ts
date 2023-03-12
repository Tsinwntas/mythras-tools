import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutmanoeuvringComponent } from './outmanoeuvring.component';

describe('OutmanoeuvringComponent', () => {
  let component: OutmanoeuvringComponent;
  let fixture: ComponentFixture<OutmanoeuvringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutmanoeuvringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutmanoeuvringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
