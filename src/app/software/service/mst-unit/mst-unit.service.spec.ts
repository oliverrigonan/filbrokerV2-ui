import { TestBed } from '@angular/core/testing';

import { MstUnitService } from './mst-unit.service';

describe('MstUnitService', () => {
  let service: MstUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
