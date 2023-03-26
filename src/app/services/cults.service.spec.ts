import { TestBed } from '@angular/core/testing';

import { CultsService } from './cults.service';

describe('CultsService', () => {
  let service: CultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
