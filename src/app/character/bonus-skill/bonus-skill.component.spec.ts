import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusSkillComponent } from './bonus-skill.component';

describe('BonusSkillComponent', () => {
  let component: BonusSkillComponent;
  let fixture: ComponentFixture<BonusSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
