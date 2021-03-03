import { TestBed } from '@angular/core/testing';

import { MstUserRightsService } from './mst-user-rights.service';

describe('MstUserRightsService', () => {
  let service: MstUserRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstUserRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
