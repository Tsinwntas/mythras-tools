import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPdfComponent } from './character-pdf.component';

describe('CharacterPdfComponent', () => {
  let component: CharacterPdfComponent;
  let fixture: ComponentFixture<CharacterPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
