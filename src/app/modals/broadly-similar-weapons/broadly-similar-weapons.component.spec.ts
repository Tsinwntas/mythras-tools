import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadlySimilarWeaponsComponent } from './broadly-similar-weapons.component';

describe('BroadlySimilarWeaponsComponent', () => {
  let component: BroadlySimilarWeaponsComponent;
  let fixture: ComponentFixture<BroadlySimilarWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadlySimilarWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadlySimilarWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
