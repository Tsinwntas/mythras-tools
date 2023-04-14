import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCharacterComponent } from './load-character.component';

describe('LoadCharacterComponent', () => {
  let component: LoadCharacterComponent;
  let fixture: ComponentFixture<LoadCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
