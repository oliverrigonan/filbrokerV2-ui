import { TestBed } from '@angular/core/testing';

import { MstBrokerService } from './mst-broker.service';

describe('MstBrokerService', () => {
  let service: MstBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
