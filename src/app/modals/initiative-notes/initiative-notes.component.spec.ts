import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeNotesComponent } from './initiative-notes.component';

describe('InitiativeNotesComponent', () => {
  let component: InitiativeNotesComponent;
  let fixture: ComponentFixture<InitiativeNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativeNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
