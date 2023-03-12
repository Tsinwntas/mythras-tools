import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InanimateObjectsComponent } from './inanimate-objects.component';

describe('InanimateObjectsComponent', () => {
  let component: InanimateObjectsComponent;
  let fixture: ComponentFixture<InanimateObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InanimateObjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InanimateObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
