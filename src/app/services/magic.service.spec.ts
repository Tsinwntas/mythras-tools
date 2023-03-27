import { TestBed } from '@angular/core/testing';

import { MagicService } from './magic.service';

describe('MagicService', () => {
  let service: MagicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
