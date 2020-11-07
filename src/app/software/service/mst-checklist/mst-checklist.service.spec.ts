import { TestBed } from '@angular/core/testing';

import { MstChecklistService } from './mst-checklist.service';

describe('MstChecklistService', () => {
  let service: MstChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
