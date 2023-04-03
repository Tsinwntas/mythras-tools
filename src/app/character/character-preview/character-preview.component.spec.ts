import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPreviewComponent } from './character-preview.component';

describe('CharacterPreviewComponent', () => {
  let component: CharacterPreviewComponent;
  let fixture: ComponentFixture<CharacterPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
