import { TestBed } from '@angular/core/testing';

import { RepSummaryService } from './rep-summary.service';

describe('RepSummaryService', () => {
  let service: RepSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
