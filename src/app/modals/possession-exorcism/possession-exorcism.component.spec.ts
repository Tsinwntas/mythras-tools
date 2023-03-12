import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PossessionExorcismComponent } from './possession-exorcism.component';

describe('PossessionExorcismComponent', () => {
  let component: PossessionExorcismComponent;
  let fixture: ComponentFixture<PossessionExorcismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PossessionExorcismComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PossessionExorcismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
