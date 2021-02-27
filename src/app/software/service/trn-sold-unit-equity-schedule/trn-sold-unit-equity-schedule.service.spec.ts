import { TestBed } from '@angular/core/testing';

import { TrnSoldUnitEquityScheduleService } from './trn-sold-unit-equity-schedule.service';

describe('TrnSoldUnitEquityScheduleService', () => {
  let service: TrnSoldUnitEquityScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnSoldUnitEquityScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
