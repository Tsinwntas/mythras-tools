import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorterReachComponent } from './shorter-reach.component';

describe('ShorterReachComponent', () => {
  let component: ShorterReachComponent;
  let fixture: ComponentFixture<ShorterReachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShorterReachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShorterReachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
