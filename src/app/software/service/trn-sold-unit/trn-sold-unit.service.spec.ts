import { TestBed } from '@angular/core/testing';

import { TrnSoldUnitService } from './trn-sold-unit.service';

describe('TrnSoldUnitService', () => {
  let service: TrnSoldUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSoldUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
