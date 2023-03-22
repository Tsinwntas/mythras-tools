import { TestBed } from '@angular/core/testing';

import { BackgroundEventsService } from './background-events.service';

describe('BackgroundEventsService', () => {
  let service: BackgroundEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
