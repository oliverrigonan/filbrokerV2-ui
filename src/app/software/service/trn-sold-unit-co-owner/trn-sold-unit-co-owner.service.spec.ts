import { TestBed } from '@angular/core/testing';

import { TrnSoldUnitCoOwnerService } from './trn-sold-unit-co-owner.service';

describe('TrnSoldUnitCoOwnerService', () => {
  let service: TrnSoldUnitCoOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSoldUnitCoOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
