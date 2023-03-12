import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntoContactComponent } from './into-contact.component';

describe('IntoContactComponent', () => {
  let component: IntoContactComponent;
  let fixture: ComponentFixture<IntoContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntoContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntoContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
