import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MythrasToDndMonsterBlockComponent } from './mythras-to-dnd-monster-block.component';

describe('MythrasToDndMonsterBlockComponent', () => {
  let component: MythrasToDndMonsterBlockComponent;
  let fixture: ComponentFixture<MythrasToDndMonsterBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MythrasToDndMonsterBlockComponent]
    });
    fixture = TestBed.createComponent(MythrasToDndMonsterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
