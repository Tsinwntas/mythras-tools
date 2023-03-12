import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLuckComponent } from './group-luck.component';

describe('GroupLuckComponent', () => {
  let component: GroupLuckComponent;
  let fixture: ComponentFixture<GroupLuckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLuckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupLuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
