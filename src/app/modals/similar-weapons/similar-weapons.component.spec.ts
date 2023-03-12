import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarWeaponsComponent } from './similar-weapons.component';

describe('SimilarWeaponsComponent', () => {
  let component: SimilarWeaponsComponent;
  let fixture: ComponentFixture<SimilarWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
