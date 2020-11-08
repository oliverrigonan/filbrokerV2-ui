import { TestBed } from '@angular/core/testing';

import { MstUserService } from './mst-user.service';

describe('MstUserService', () => {
  let service: MstUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
