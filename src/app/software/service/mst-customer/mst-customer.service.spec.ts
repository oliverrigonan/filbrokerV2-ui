import { TestBed } from '@angular/core/testing';

import { MstCustomerService } from './mst-customer.service';

describe('MstCustomerService', () => {
  let service: MstCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
