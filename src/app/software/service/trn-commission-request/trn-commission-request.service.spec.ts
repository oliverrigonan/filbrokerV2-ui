import { TestBed } from '@angular/core/testing';

import { TrnCommissionRequestService } from './trn-commission-request.service';

describe('TrnCommissionRequestService', () => {
  let service: TrnCommissionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnCommissionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
