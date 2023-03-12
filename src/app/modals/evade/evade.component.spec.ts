import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvadeComponent } from './evade.component';

describe('EvadeComponent', () => {
  let component: EvadeComponent;
  let fixture: ComponentFixture<EvadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
