import { TestBed } from '@angular/core/testing';

import { MstProjectService } from './mst-project.service';

describe('MstProjectService', () => {
  let service: MstProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
