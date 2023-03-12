import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliarUnfamiliarComponent } from './familiar-unfamiliar.component';

describe('FamiliarUnfamiliarComponent', () => {
  let component: FamiliarUnfamiliarComponent;
  let fixture: ComponentFixture<FamiliarUnfamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliarUnfamiliarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamiliarUnfamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
