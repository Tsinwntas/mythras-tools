import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroicLastActionComponent } from './heroic-last-action.component';

describe('HeroicLastActionComponent', () => {
  let component: HeroicLastActionComponent;
  let fixture: ComponentFixture<HeroicLastActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroicLastActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroicLastActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
