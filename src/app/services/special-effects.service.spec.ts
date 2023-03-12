import { TestBed } from '@angular/core/testing';

import { SpecialEffectsService } from './special-effects.service';

describe('SpecialEffectsService', () => {
  let service: SpecialEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
