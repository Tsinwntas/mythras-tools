import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialClassComponent } from './social-class.component';

describe('SocialClassComponent', () => {
  let component: SocialClassComponent;
  let fixture: ComponentFixture<SocialClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
