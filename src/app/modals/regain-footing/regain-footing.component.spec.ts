import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegainFootingComponent } from './regain-footing.component';

describe('RegainFootingComponent', () => {
  let component: RegainFootingComponent;
  let fixture: ComponentFixture<RegainFootingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegainFootingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegainFootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
