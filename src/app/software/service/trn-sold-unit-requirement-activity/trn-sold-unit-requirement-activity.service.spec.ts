import { TestBed } from '@angular/core/testing';

import { TrnSoldUnitRequirementActivityService } from './trn-sold-unit-requirement-activity.service';

describe('TrnSoldUnitRequirementActivityService', () => {
  let service: TrnSoldUnitRequirementActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSoldUnitRequirementActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
