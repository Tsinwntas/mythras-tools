import { TestBed } from '@angular/core/testing';

import { ModalHandlerService } from './modal-handler.service';

describe('ModalHandlerService', () => {
  let service: ModalHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
