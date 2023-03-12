import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMagicComponent } from './cast-magic.component';

describe('CastMagicComponent', () => {
  let component: CastMagicComponent;
  let fixture: ComponentFixture<CastMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
