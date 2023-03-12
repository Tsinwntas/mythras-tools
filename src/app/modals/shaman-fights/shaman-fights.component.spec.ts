import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShamanFightsComponent } from './shaman-fights.component';

describe('ShamanFightsComponent', () => {
  let component: ShamanFightsComponent;
  let fixture: ComponentFixture<ShamanFightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShamanFightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShamanFightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
