import { TestBed } from '@angular/core/testing';

import { TrnCollectionPaymentService } from './trn-collection-payment.service';

describe('TrnCollectionPaymentService', () => {
  let service: TrnCollectionPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnCollectionPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
