import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveBlockingComponent } from './passive-blocking.component';

describe('PassiveBlockingComponent', () => {
  let component: PassiveBlockingComponent;
  let fixture: ComponentFixture<PassiveBlockingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiveBlockingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassiveBlockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
