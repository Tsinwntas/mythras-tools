import { TestBed } from '@angular/core/testing';

import { PassionsService } from './passions.service';

describe('PassionsService', () => {
  let service: PassionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
