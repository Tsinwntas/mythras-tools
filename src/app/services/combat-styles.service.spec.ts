import { TestBed } from '@angular/core/testing';

import { CombatStylesService } from './combat-styles.service';

describe('CombatStylesService', () => {
  let service: CombatStylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatStylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
