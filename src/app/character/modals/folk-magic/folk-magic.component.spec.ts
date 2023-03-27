import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolkMagicComponent } from './folk-magic.component';

describe('FolkMagicComponent', () => {
  let component: FolkMagicComponent;
  let fixture: ComponentFixture<FolkMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolkMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolkMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
