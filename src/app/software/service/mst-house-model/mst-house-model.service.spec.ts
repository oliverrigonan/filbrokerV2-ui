import { TestBed } from '@angular/core/testing';

import { MstHouseModelService } from './mst-house-model.service';

describe('MstHouseModelService', () => {
  let service: MstHouseModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstHouseModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
