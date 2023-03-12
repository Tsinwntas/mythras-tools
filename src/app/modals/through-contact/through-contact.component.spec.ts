import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThroughContactComponent } from './through-contact.component';

describe('ThroughContactComponent', () => {
  let component: ThroughContactComponent;
  let fixture: ComponentFixture<ThroughContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThroughContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThroughContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
