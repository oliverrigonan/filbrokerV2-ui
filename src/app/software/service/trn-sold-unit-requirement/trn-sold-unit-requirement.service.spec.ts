import { TestBed } from '@angular/core/testing';

import { TrnSoldUnitRequirementService } from './trn-sold-unit-requirement.service';

describe('TrnSoldUnitRequirementService', () => {
  let service: TrnSoldUnitRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSoldUnitRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
