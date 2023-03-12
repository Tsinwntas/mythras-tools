import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StruggleComponent } from './struggle.component';

describe('StruggleComponent', () => {
  let component: StruggleComponent;
  let fixture: ComponentFixture<StruggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StruggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StruggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
